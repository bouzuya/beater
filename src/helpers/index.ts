import { process } from '../globals/process';
import { ChildProcessReporter } from '../child-process-reporter';
import { FixtureHelper } from '../types/fixture-helper';
import { Reporter } from '../types/reporter';
import { TestHelper } from '../types/test-helper';
import { Runner } from '../runner';
import { init as initFixture } from './fixture';
import { init as initTest } from './test';

const init = (reporter?: Reporter): {
  fixture: FixtureHelper;
  test: TestHelper;
} => {
  const runner = new Runner(
    typeof process.send === 'undefined' ? reporter : new ChildProcessReporter()
  );
  const fixture = initFixture();
  const test = initTest(runner);
  return { fixture, test };
};

export { init };
