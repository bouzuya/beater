import { Promise } from '../globals';

export interface TestFn {
  <T>(): T | Promise<T>;
}
