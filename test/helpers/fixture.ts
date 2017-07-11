import * as assert from 'power-assert';
import * as sinon from 'sinon';
import { test } from '../helper';
import { init } from '../../src/helpers/fixture';

const fixture = init();

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

const after = ({ sandbox }: Context) => void sandbox.restore();

test('helpers/fixture - without after', fixture({ before, after }, ({
  before, test
}) => {
  return fixture({ before }, test)().then(() => {
    assert(before.calledBefore(test));
  });
}));

test('helpers/fixture - without before', fixture({ before, after }, ({
  after, test
}) => {
  return fixture({ after }, test)().then(() => {
    assert(after.calledAfter(test));
  });
}));

test('helpers/fixture - both', fixture({ before, after }, ({
  before, after, test
}) => {
  return fixture({ before, after }, test)().then(() => {
    assert(before.calledBefore(test));
    assert(after.calledAfter(test));
  });
}));

test('helpers/fixture - before -(context)-> test -(context)-> after', fixture({
  before, after
}, ({
  before, after, test
}) => {
  const context = 123;
  before.returns(context);
  return fixture({ before, after }, test)().then(() => {
    assert(test.getCall(0).args[0] === context);
    assert(after.getCall(0).args[0] === context);
  });
}));

test('helpers/fixture - test -(result)-> after', fixture({ before, after }, ({
  before, after, test
}) => {
  const result = 456;
  test.returns(result);
  return fixture({ before, after }, test)().then(() => {
    assert(after.getCall(0).args[1] === result);
  });
}));

test('helpers/fixture - before (error)', fixture({ before, after }, ({
  before, after, test
}) => {
  const error = new Error('foo');
  before.throws(error);
  return fixture({ before, after }, test)().catch(e => {
    assert(before.callCount === 1);
    assert(test.callCount === 0);
    assert(after.callCount === 0);
    assert.deepEqual(e, error);
  });
}));

test('helpers/fixture - test (error)', fixture({ before, after }, ({
  before, after, test
}) => {
  const error = new Error('bar');
  test.throws(error);
  return fixture({ before, after }, test)().catch(e => {
    assert(before.callCount === 1);
    assert(test.callCount === 1);
    assert(after.callCount === 1);
    assert.deepEqual(e, error);
  });
}));

test('helpers/fixture - after (error)', fixture({ before, after }, ({
  before, after, test
}) => {
  const error = new Error('bar');
  after.throws(error);
  return fixture({ before, after }, test)().catch(e => {
    assert(before.callCount === 1);
    assert(test.callCount === 1);
    assert(after.callCount === 1);
    assert.deepEqual(e, error);
  });
}));
