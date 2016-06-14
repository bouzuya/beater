import { Test } from './test';
import { TestResult } from './test-result';

export interface Reporter {
  started(): void;
  finished(results: TestResult[]): void;
  testStarted(test: Test): void;
  testFinished(result: TestResult): void;
}
