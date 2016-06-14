import { Test } from './test';
import { Error } from './error';

export interface TestResult {
  test: Test;
  error?: Error;
}
