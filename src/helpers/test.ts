import { process } from '../globals/process'
import { Runner } from '../runner';
import { ClientRunner, ServerRunner } from '../runners';

let runner: Runner = null; // singleton

const getRunner = (): Runner => {
  if (!runner) runner = newRunner();
  return runner;
};

const isBrowser = (): boolean => (<any>process).browser;

const newRunner = (): Runner => {
  return isBrowser() ? new ClientRunner() : new ServerRunner();
};

const test = <T>(name: string, test: () => T | Promise<T>): void => {
  const runner = getRunner();
  runner.add({ name, test });
};

export { test, getRunner };
