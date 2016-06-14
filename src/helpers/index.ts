import { process } from '../globals/process';
import { Promise } from '../globals/promise';
import { ChildProcessReporter } from '../child-process-reporter';
import { Reporter } from '../types/reporter';
import { Runner } from '../runner';
import { init as initFixture, FixtureHelper } from './fixture';
import { init as initTest, TestHelper } from './test';

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
