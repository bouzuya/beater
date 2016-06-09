import { EventEmitter } from 'events';
import { Message } from '../message';
import { Runner } from '../runner';
import { Test } from '../test';
import { process } from '../process';

// Runner for Node.js
export class ServerRunner extends EventEmitter implements Runner {
  private running: boolean;
  private tests: Test<any>[];
  private pendingTests: Test<any>[];
  private finishedTests: Test<any>[];

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

  add(test: Test<any>): void {
    this.tests.push(test);
    this.pendingTests.push(test);
    this.internalRun();
  }

  private internalRun(): void {
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
    Promise.resolve()
      .then(test.test)
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

  private send(type: string, test?: Test<any>, error?: any): void {
    const message: Message = {
      type, test: test ? test.name : undefined, error
    };
    process.send && process.send(message);
  }

  // FIXME:
  private serializeError(error?: Error): any {
    if (!error) return;
    const { name, message, stack } = error;
    return { name, message, stack };
  }
}
