import * as assert from 'power-assert';
import * as sinon from 'sinon';
import { test, fixture } from '../../src/';

type Context = {
  sandbox: sinon.SinonSandbox;
  before: sinon.SinonStub;
  after: sinon.SinonStub;
  test: sinon.SinonStub;
};

const before = (): Context => {
  const sandbox = sinon.sandbox.create();
  const before = sandbox.stub();
  const after = sandbox.stub();
  const test = sandbox.stub();
  return { sandbox, before, after, test };
};

const after = ({ sandbox }: Context) => sandbox.restore();

test('without after', fixture({ before, after }, ({ before, test }) => {
  return fixture({ before }, test)().then(() => {
    assert(before.calledBefore(test));
  });
}));

test('without before', fixture({ before, after }, ({ after, test }) => {
  return fixture({ after }, test)().then(() => {
    assert(after.calledAfter(test));
  });
}));

test('both', fixture({ before, after }, ({ before, after, test }) => {
  return fixture({ before, after }, test)().then(() => {
    assert(before.calledBefore(test));
    assert(after.calledAfter(test));
  });
}));

test('before -(context)-> test -(context)-> after', fixture({ before, after }, (
  { before, after, test }
) => {
  const context = 123;
  before.returns(context);
  return fixture({ before, after }, test)().then(() => {
    assert(test.getCall(0).args[0] === context);
    assert(after.getCall(0).args[0] === context);
  });
}));

test('test -(result)-> after', fixture({ before, after }, (
  { before, after, test }
) => {
  const result = 456;
  test.returns(result);
  return fixture({ before, after }, test)().then(() => {
    assert(after.getCall(0).args[1] === result);
  });
}));

test('before (error)', fixture({ before, after }, ({ before, after, test }) => {
  const error = new Error('foo');
  before.throws(error);
  return fixture({ before, after }, test)().catch(e => {
    assert(before.callCount === 1);
    assert(test.callCount === 0);
    assert(after.callCount === 0);
    assert.deepEqual(e, error);
  });
}));

test('test (error)', fixture({ before, after }, ({ before, after, test }) => {
  const error = new Error('bar');
  test.throws(error);
  return fixture({ before, after }, test)().catch(e => {
    assert(before.callCount === 1);
    assert(test.callCount === 1);
    assert(after.callCount === 1);
    assert.deepEqual(e, error);
  });
}));

test('after (error)', fixture({ before, after }, ({ before, after, test }) => {
  const error = new Error('bar');
  after.throws(error);
  return fixture({ before, after }, test)().catch(e => {
    assert(before.callCount === 1);
    assert(test.callCount === 1);
    assert(after.callCount === 1);
    assert.deepEqual(e, error);
  });
}));
