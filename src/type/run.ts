import { Test, TestResult } from 'beater-reporter';

export interface Run {
  (tests: Test[]): Promise<TestResult[]>;
}
