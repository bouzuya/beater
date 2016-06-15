import { process } from './globals';
import { ChildProcessReporter } from './child-process-reporter';
import { FixtureHelper } from './types/fixture-helper';
import { Reporter } from './types/reporter';
import { TestHelper } from './types/test-helper';
import { initFixture, initTest } from './helpers';
import { Runner } from './runner';

const init = (reporter?: Reporter): {
  fixture: FixtureHelper;
  test: TestHelper;
} => {
  const r = typeof process.send === 'undefined'
    ? reporter : new ChildProcessReporter();
  const runner = new Runner(r);
  const fixture = initFixture();
  const test = initTest(runner);
  return { fixture, test };
};

export { init };
