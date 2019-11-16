import {
  Test,
  TestFn,
  TestMeta
} from 'beater-reporter';

const test = (name: string, fn: Function): Test => {
  const testMeta: TestMeta = new Map<string, string>([['name', name]]);
  const testFn: TestFn = async (): Promise<void> => fn();
  return { fn: testFn, meta: testMeta };
};

export { Test, TestFn, TestMeta, test };
