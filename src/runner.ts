import { Reporter, TestResult } from 'beater-reporter';
import { process } from './globals';
import { EventEmitter } from 'events';
import { InternalTest } from './types/internal-test';

export class Runner extends EventEmitter {
  private running: boolean;
  private tests: InternalTest[];
  private pendingTests: InternalTest[];
  private finishedTests: TestResult[];
  private reporter: Reporter;

  constructor(reporter: Reporter) {
    super();
    if (typeof reporter === 'undefined') {
      throw new Error('reporter is not defined');
    }
    this.reporter = reporter;
    this.running = false;
    this.tests = [];
    this.pendingTests = [];
    this.finishedTests = [];
    process.on('exit', () => {
      if (this.finishedTests.length < this.tests.length) {
        const error = new Error('Pending test exists, but process exit');
        const serialized = this.serializeError(error);
        this.reporter.finished([{
          test: { name: 'undefined' }, // FIXME
          error: serialized
        }]);
      }
    });
  }

  add(test: InternalTest): void {
    this.tests.push(test);
    this.pendingTests.push(test);
    this.privateRun();
  }

  private privateRun(): void {
    if (this.running) return; // already running
    this.running = true;
    process.nextTick(() => this.nextTest());
  }

  private nextTest(): void {
    if (this.pendingTests.length === 0) {
      this.running = false;
      return;
    }
    if (this.pendingTests.length === this.tests.length) {
      this.reporter.started();
    }
    const test = this.pendingTests.shift()!;
    this.reporter.testStarted({ name: test.name });
    Promise.resolve()
      .then((): Promise<void> => {
        const x = test.fn();
        return typeof x === 'undefined' // is void
          ? Promise.resolve()
          : Promise.resolve(x).then((): void => void 0);
      })
      .then(() => void 0, this.serializeError.bind(this))
      .then((error: Error | undefined) => {
        const result: TestResult = { test: { name: test.name }, error };
        this.finishedTests.push(result);
        this.reporter.testFinished(result);
        if (this.finishedTests.length === this.tests.length) {
          this.reporter.finished(this.finishedTests);
        }
        this.nextTest();
      });
  }

  // FIXME:
  private serializeError(error: any): any {
    error = typeof error === 'undefined' ? new Error('undefined') : error;
    error = error === null ? new Error('null') : error;
    error = typeof error === 'string' ? new Error('string') : error;
    const { name, message, stack } = error;
    return { name, message, stack };
  }
}
