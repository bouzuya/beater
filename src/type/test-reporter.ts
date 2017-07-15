import { Test } from './test';
import { TestResult } from './test-result';

export interface TestReporter {
  finished(results: TestResult[]): void;
  started(tests: Test[]): void;
  testFinished(result: TestResult): void;
  testStarted(test: Test): void;
}
