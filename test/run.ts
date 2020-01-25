import * as beaterTapReporter from 'beater-tap-reporter';
import assert from 'power-assert';
import sinon from 'sinon';
import { Test, TestResult } from '../src';
import { run } from '../src/run';
import * as runWithOptions from '../src/run-with-options';
import { test } from './helper';

const sandboxFixture = (
  fn: (sandbox: sinon.SinonSandbox) => Promise<void>
) => async () => {
  const sandbox = sinon.createSandbox();
  try {
    await fn(sandbox);
  } finally {
    sandbox.restore();
  }
};

const category = 'run() - ';
const tests: Test[] = [
  test(
    category + 'call runWithOptions',
    sandboxFixture(async (sandbox) => {
      const results: TestResult[] = [];
      const reporter = {
        finished() {},
        started() {},
        testFinished() {},
        testStarted() {}
      };
      const reporterStub = sandbox
        .stub(beaterTapReporter, 'reporter')
        .returns(reporter);
      const runWithOptionsStub = sandbox
        .stub(runWithOptions, 'runWithOptions')
        .returns(() => Promise.resolve(results));

      assert.deepStrictEqual(await run([]), results);

      assert(runWithOptionsStub.callCount === 1);
      assert.deepStrictEqual(runWithOptionsStub.getCall(0).args, [
        { reporter }
      ]);
      assert(reporterStub.callCount === 1);
    })
  )
];

export { tests };
