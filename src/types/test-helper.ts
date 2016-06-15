import { TestFn } from '../types/test-fn';

export interface TestHelper {
  (name: string, fn: TestFn): void;
}
