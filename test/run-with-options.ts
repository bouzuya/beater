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
  }),
  test(category1 + 'no tests', () => {
    const reporter = reporterStub();
    return runWithOptions({ reporter })([]).then((results) => {
      assert(results.length === 0);
    });
  }),
  test(category1 + '1 test', () => {
    const reporter = reporterStub();
    const fn1 = sinon.stub();
    const test1 = test('name1', fn1);
    return runWithOptions({ reporter })([test1]).then((results) => {
      assert(results.length === 1);
      assert(results[0].test === test1); // .test is private
      assert(typeof results[0].error === 'undefined'); // .error is private
      assert(fn1.callCount === 1);
      assert(fn1.getCall(0).args.length === 0);
    });
  }),
  test(category1 + '2 tests', () => {
    const reporter = reporterStub();
    const fn1 = sinon.stub();
    const fn2 = sinon.stub();
    const test1 = test('name1', fn1);
    const test2 = test('name2', fn2);
    return runWithOptions({ reporter })([test1, test2]).then((results) => {
      assert(results.length === 2);
      assert(results[0].test === test1); // .test is private
      assert(results[1].test === test2); // .test is private
      assert(typeof results[0].error === 'undefined'); // .error is private
      assert(typeof results[1].error === 'undefined'); // .error is private
      assert(fn1.callCount === 1);
      assert(fn1.getCall(0).args.length === 0);
      assert(fn2.callCount === 1);
      assert(fn2.getCall(0).args.length === 0);
    });
  }),
  test(category1 + 'failure', () => {
    const reporter = reporterStub();
    const fn1 = sinon.stub().throws(new Error('hoge'));
    const test1 = test('name1', fn1);
    return runWithOptions({ reporter })([test1]).then(() => assert.fail(), (results) => {
      assert(results.length === 1);
      assert(results[0].test === test1); // .test is private
      assert(typeof results[0].error !== 'undefined'); // .error is private
      assert(results[0].error!.name === 'Error');
      assert(results[0].error!.message === 'hoge');
      assert(results[0].error!.stack.length > 0);
      assert(fn1.callCount === 1);
      assert(fn1.getCall(0).args.length === 0);
    });
  }),
  test(category1 + 'failure (not Error)', () => {
    const reporter = reporterStub();
    const fn1 = sinon.stub().throws(123);
    const test1 = test('name1', fn1);
    return runWithOptions({ reporter })([test1]).then(() => assert.fail(), (results) => {
      assert(results.length === 1);
      assert(results[0].test === test1); // .test is private
      assert(typeof results[0].error !== 'undefined'); // .error is private
      assert(fn1.callCount === 1);
      assert(fn1.getCall(0).args.length === 0);
    });
  })
];

export { tests };
