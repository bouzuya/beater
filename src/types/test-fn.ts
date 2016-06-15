import { Promise } from '../globals/promise';

export interface TestFn {
  <T>() => T | Promise<T>;
}
