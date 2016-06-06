import { EventEmitter } from 'events';
import { Message } from './message';
import { process } from './process';

export type Test<T, U> = {
  name: string;
  test: (context?: T) => U | Promise<U>;
  before: () => T | Promise<T>;
  after: (context?: T, result?: U) => void | Promise<void>;
};

class Runner extends EventEmitter {
  private running: boolean;
  private tests: Test<any, any>[];
  private pendingTests: Test<any, any>[];
  private finishedTests: Test<any, any>[];

  constructor() {
    super();
    this.running = false;
    this.tests = [];
    this.pendingTests = [];
    this.finishedTests = [];
    this.on('next', this.nextTest.bind(this));
    process.on('exit', () => {
      if (this.finishedTests.length < this.tests.length) {
        const error = new Error('Pending test exists, but process exit');
        const serialized = this.serializeError(error);
        this.send('error', undefined, serialized);
      }
    });
  }

  add(test: Test<any, any>): void {
    this.tests.push(test);
    this.pendingTests.push(test);
  }

  run(): void {
    if (this.running) return; // already running
    this.running = true;
    process.nextTick(() => this.emit('next'));
  }

  private nextTest(): void {
    if (this.pendingTests.length === 0) {
      this.running = false;
      return;
    }
    const test = this.pendingTests.shift();
    this.send('started', test);
    this.runTest(test)
      .then(() => void 0, error => {
        return (
          typeof error === 'undefined' || error === null
            ? new Error('Error is null or undefined')
            : error
        );
      })
      .then(error => {
        const serialized = this.serializeError(error);
        this.send('finished', test, serialized);
        this.finishedTests.push(test);
        this.emit('next');
      });
  }

  private runTest({ before, test, after }: Test<any, any>): Promise<any> {
    return Promise
      .resolve()
      .then(before)
      .then(context => {
        return Promise
          .resolve(context)
          .then(test)
          .then(result => {
            return Promise
              .resolve()
              .then(() => after(context, result)); // through after error
          }, error => {
            return Promise
              .resolve()
              .then(() => after(context, void 0))
              .then(() => Promise.reject(error)); // through after error
          });
      });
  }

  private send(type: string, test?: Test<any, any>, error?: any): void {
    const message: Message = { type, test: test ? test.name: undefined, error };
    process.send && process.send(message);
  }

  // FIXME:
  private serializeError(error?: Error): any {
    if (!error) return;
    const { name, message, stack } = error;
    return { name, message, stack };
  }
}

let runner: Runner;
const test = <T, U>(
  name: string,
  test: (context?: T) => U | Promise<U>,
  options?: {
    before: () => T | Promise<T>;
    after: (context?: T, result?: U) => void | Promise<void>;
  }
): void => {
  if (!runner) runner = new Runner(); // Runner is a singleton
  const before = options ? options.before : (): T => void 0;
  const after = options ? options.after : (): void => void 0;
  runner.add({ name, test, before, after });
  runner.run();
};

export { test };
