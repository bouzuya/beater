import { Test } from 'beater-reporter';
import { Promise } from '../globals';
import { TestFn } from './test-fn';

export interface InternalTest extends Test {
  fn: TestFn;
}
