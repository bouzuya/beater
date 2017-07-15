import {
  Test,
  TestFn,
  TestMeta
} from 'beater-reporter';

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
