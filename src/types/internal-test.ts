import { Test } from 'beater-reporter';
import { TestFn } from './test-fn';

export interface InternalTest extends Test {
  fn: TestFn;
}
