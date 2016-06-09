import { Runner } from '../runner';
import { ServerRunner } from '../runners';

let runner: Runner;
const test = <T>(
  name: string,
  test: () => T | Promise<T>
): void => {
  if (!runner) runner = new ServerRunner(); // Runner is a singleton
  runner.add({ name, test });
};

export { test };
