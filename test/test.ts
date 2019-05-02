import assert from 'power-assert';
import sinon from 'sinon';
import { Test, test } from '../src';

const category = 'test() - ';
const tests: Test[] = [
  test(category + 'name', () => {
    const name = 'name1';
    const o = test(name, () => void 0);
    assert(o.meta.get('name') === 'name1'); // o.meta is private
  }),
  test(category + 'fn failure', () => {
    const error = new Error('hoge');
    const fn = sinon.stub().throws(error);
    const o = test('', fn);
    return o.fn().then(() => assert.fail(), (e) => { // o.fn is private
      assert(e === error);
    });
  }),
  test(category + 'fn failure (not Error)', () => {
    const error = 123;
    const fn = sinon.stub().throws(error);
    const o = test('', fn);
    return o.fn().then(() => assert.fail(), (e) => { // o.fn is private
      assert(e === 123);
    });
  }),
  test(category + 'fn success', () => {
    const fn = sinon.stub().returns(void 0);
    const o = test('', fn);
    return o.fn().then(() => { // o.fn is private
      assert(fn.callCount === 1);
      assert(fn.getCall(0).args.length === 0);
    });
  }),
  test(category + 'fn promise failure', () => {
    const error = new Error('hoge');
    const fn = sinon.stub().returns(Promise.reject(error));
    const o = test('', fn);
    return o.fn().then(() => assert.fail(), (e) => { // o.fn is private
      assert(e === error);
    });
  }),
  test(category + 'fn promise success', () => {
    const fn = sinon.stub().returns(Promise.resolve());
    const o = test('', fn);
    return o.fn().then(() => { // o.fn is private
      assert(fn.callCount === 1);
      assert(fn.getCall(0).args.length === 0);
    });
  })
];

export { tests };
