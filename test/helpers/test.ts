import * as assert from 'power-assert';
import * as sinon from 'sinon';
import { test, fixture } from '../helper';
import { init } from '../../src/helpers/test';
import { Runner } from '../../src/runner';

type Context = {
  sandbox: sinon.SinonSandbox;
  add: sinon.SinonStub;
  runner: Runner;
};

const before = (): Context => {
  const sandbox = sinon.sandbox.create();
  const add = sandbox.stub();
  const runner: Runner = <any>{ add };
  return { sandbox, add, runner };
};

const after = ({ sandbox }: Context) => sandbox.restore();

test('helpers/test - calls runner.add()', fixture({ before, after }, ({
  add, runner
}) => {
  const t = init(runner);
  const name = 'name 1';
  const fn = (): undefined => void 0;
  t(name, fn);
  assert(add.callCount === 1);
  assert(add.getCall(0).args[0].name === name);
  assert(add.getCall(0).args[0].fn === fn);
}));
