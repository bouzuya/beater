import { Promise } from '../globals/promise';
import { Test } from './test';
import { TestFn } from './test-fn';

export interface InternalTest extends Test {
  fn: TestFn;
}
