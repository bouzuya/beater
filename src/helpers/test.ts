import { Promise } from '../globals/promise';
import { Runner } from '../runner';

export type TestFn = <T>() => T | Promise<T>;

export type TestHelper = (name: string, fn: TestFn) => void;

const init = (runner: Runner): (name: string, fn: TestFn) => void => {
  return (name: string, fn: TestFn): void => {
    runner.add({ name, fn });
  };
};

export { init };
