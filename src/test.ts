import { Test } from './type/test';
import { TestFn } from './type/test-fn';
import { TestMeta } from './type/test-meta';

const test = (name: string, fn: Function): Test => {
  const testMeta: TestMeta = new Map<string, string>([['name', name]]);
  const testFn: TestFn = (): Promise<void> => {
    try {
      return Promise.resolve(fn());
    } catch (error) {
      return Promise.reject(error);
    }
  };
  return { fn: testFn, meta: testMeta };
};

export { Test, TestFn, TestMeta, test };
