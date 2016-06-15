import { Runner } from '../runner';
import { TestHelper } from '../types/test-helper';

const init = (runner: Runner): TestHelper => {
  return (name, fn) => void runner.add({ name, fn });
};

export { init };
