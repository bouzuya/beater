import { Test } from './test';
import { TestResult } from './test-result';

export interface Run {
  (tests: Test[]): Promise<TestResult[]>;
}
