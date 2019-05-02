import assert from 'power-assert';
import sinon from 'sinon';
import { Test, run, test } from '../src';

const category = 'run() - ';
const tests: Test[] = [
  test(category + 'no tests', () => {
    return run([]).then((results) => {
      assert(results.length === 0);
    });
  }),
  test(category + '1 test', () => {
    const fn1 = sinon.stub();
    const test1 = test('name1', fn1);
    return run([test1]).then((results) => {
      assert(results.length === 1);
      assert(results[0].test === test1); // .test is private
      assert(typeof results[0].error === 'undefined'); // .error is private
      assert(fn1.callCount === 1);
      assert(fn1.getCall(0).args.length === 0);
    });
  }),
  test(category + '2 tests', () => {
    const fn1 = sinon.stub();
    const fn2 = sinon.stub();
    const test1 = test('name1', fn1);
    const test2 = test('name2', fn2);
    return run([test1, test2]).then((results) => {
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
  test(category + 'failure', () => {
    const fn1 = sinon.stub().throws(new Error('hoge'));
    const test1 = test('name1', fn1);
    return run([test1]).then(() => assert.fail(), (results) => {
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
  test(category + 'failure (not Error)', () => {
    const fn1 = sinon.stub().throws(123);
    const test1 = test('name1', fn1);
    return run([test1]).then(() => assert.fail(), (results) => {
      assert(results.length === 1);
      assert(results[0].test === test1); // .test is private
      assert(typeof results[0].error !== 'undefined'); // .error is private
      assert(fn1.callCount === 1);
      assert(fn1.getCall(0).args.length === 0);
    });
  })
];

export { tests };
