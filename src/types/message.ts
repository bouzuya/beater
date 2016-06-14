import { Test } from './test';
import { TestResult } from './test-result';

export interface Message {
  type: string;
  test?: Test;
  result?: TestResult;
  results?: TestResult[];
}
