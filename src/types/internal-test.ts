import { Promise } from '../globals/promise';
import { Test } from './test';

export interface InternalTest extends Test {
  fn: <T>() => T | Promise<T>;
}
