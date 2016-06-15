import { Test, TestResult } from 'beater-reporter';

export interface Message {
  type: string;
  test?: Test;
  result?: TestResult;
  results?: TestResult[];
}
