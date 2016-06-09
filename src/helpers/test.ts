import { Runner } from '../runner';
import { ClientRunner, ServerRunner } from '../runners';

let runner: Runner = null; // singleton

const getRunner = (): Runner => {
  if (!runner) runner = newRunner();
  return runner;
};

const newRunner = (): Runner => {
  return process.browser ? new ClientRunner() : new ServerRunner();
};

const test = <T>(name: string, test: () => T | Promise<T>): void => {
  const runner = getRunner();
  runner.add({ name, test });
};

export { test, getRunner };
