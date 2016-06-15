import { process } from './globals';
import { Message } from './types/message';
import { Reporter } from './types/reporter';
import { Test } from './types/test';
import { TestResult } from './types/test-result';

export class ChildProcessReporter implements Reporter {
  constructor() {
    const isNotChildProcess = typeof process.send === 'undefined';
    if (isNotChildProcess) throw new Error('assertion: is not child process');
  }

  started(): void {
    this.send({ type: 'report-started' });
  }

  finished(results: TestResult[]): void {
    this.send({ type: 'report-finished', results });
  }

  testStarted(test: Test): void {
    this.send({ type: 'report-test-started', test });
  }

  testFinished(result: TestResult): void {
    this.send({ type: 'report-test-finished', result });
  }

  private send(message: Message): void {
    process.send && process.send(message);
  }
}
