import { Error } from './error';
import { Test } from './test';

export interface TestResult {
  test: Test;
  error?: Error;
}
