import { TestFn } from './test-fn';
import { TestMeta } from './test-meta';

export interface Test {
  fn: TestFn;
  meta: TestMeta;
}
