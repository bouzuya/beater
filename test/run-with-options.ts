import assert from 'power-assert';
import sinon from 'sinon';
import { Test, runWithOptions, test } from '../src';

const reporterStub = () => {
  return {
    finished: sinon.stub(),
    started: sinon.stub(),
    testFinished: sinon.stub(),
    testStarted: sinon.stub()
  };
};

const category1 = 'runWithOptions() - ';
const tests: Test[] = [
  test(category1 + 'no tests', () => {
    const reporter = reporterStub();
    return runWithOptions({ reporter })([]).then((results) => {
      assert(results.length === 0);
      assert(reporter.finished.callCount === 1);
      assert(reporter.finished.getCall(0).args.length === 1)
      assert(reporter.finished.getCall(0).args[0].length === 0); // []
      assert(reporter.started.callCount === 1);
      assert(reporter.started.getCall(0).args.length === 1)
      assert(reporter.started.getCall(0).args[0].length === 0); // []
      assert(reporter.testFinished.callCount === 0);
      assert(reporter.testStarted.callCount === 0);
    });
  }),
  test(category1 + '1 test', () => {
    const reporter = reporterStub();
    const test1 = test('name1', () => void 0);
    return runWithOptions({ reporter })([test1]).then((results) => {
      assert(results.length === 1);
      assert(reporter.finished.callCount === 1);
      assert(reporter.finished.getCall(0).args.length === 1)
      assert(reporter.finished.getCall(0).args[0].length === 1); // [result1]
      assert(reporter.finished.getCall(0).args[0][0].test === test1);
      assert(reporter.finished.getCall(0).args[0][0].error === void 0);
      assert(reporter.started.callCount === 1);
      assert(reporter.started.getCall(0).args.length === 1)
      assert(reporter.started.getCall(0).args[0].length === 1); // [test1]
      assert(reporter.started.getCall(0).args[0][0] === test1);
      assert(reporter.testFinished.callCount === 1);
      assert(reporter.testFinished.getCall(0).args.length === 1); // result1
      assert(reporter.testFinished.getCall(0).args[0].test === test1);
      assert(reporter.testFinished.getCall(0).args[0].error === void 0);
      assert(reporter.testStarted.callCount === 1);
      assert(reporter.testStarted.getCall(0).args.length === 1); // test1
      assert(reporter.testStarted.getCall(0).args[0] === test1);
    });
  })
];

export { tests };
