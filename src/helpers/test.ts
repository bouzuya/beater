import { Promise } from '../globals/promise';
import { Runner } from '../runner';
import { TestFn } from '../types/test-fn';

export type TestHelper = (name: string, fn: TestFn) => void;

const init = (runner: Runner): (name: string, fn: TestFn) => void => {
  return (name: string, fn: TestFn): void => void runner.add({ name, fn });
};

export { init };
