import * as assert from 'power-assert';
import * as proxyquire from 'proxyquire';
import * as sinon from 'sinon';
import { test, fixture } from './helper';
import { ChildProcessReporter } from '../src/child-process-reporter';

type Context = {
  sandbox: sinon.SinonSandbox;
  reporter: ChildProcessReporter;
  send: sinon.SinonStub;
};

const before = (): Context => {
  const sandbox = sinon.sandbox.create();
  const send = sandbox.stub();
  const reporter = new (proxyquire('../src/child-process-reporter', {
    './globals': { process: { send } }
  }).ChildProcessReporter);
  return { sandbox, send, reporter };
};

const after = ({ sandbox }: Context) => void sandbox.restore();

test('child-process-reporter - started', fixture({ before, after }, ({
  reporter, send
}) => {
  reporter.started();
  assert(send.callCount === 1);
  assert(send.getCall(0).args[0].type === 'report-started');
}));

test('child-process-reporter - finished', fixture({ before, after }, ({
  reporter, send
}) => {
  const test = { name: 'test' };
  const error = { name: 'Error', message: 'Hello' };
  const result = { test, error };
  reporter.finished([result]);
  assert(send.callCount === 1);
  assert(send.getCall(0).args[0].type === 'report-finished');
  assert.deepEqual(send.getCall(0).args[0].results, [result]);
}));

test('child-process-reporter - testStarted', fixture({ before, after }, ({
  reporter, send
}) => {
  const test = { name: 'test' };
  reporter.testStarted(test);
  assert(send.callCount === 1);
  assert(send.getCall(0).args[0].type === 'report-test-started');
  assert.deepEqual(send.getCall(0).args[0].test, test);
}));

test('child-process-reporter - testFinished', fixture({ before, after }, ({
  reporter, send
}) => {
  const test = { name: 'test' };
  const error = { name: 'Error', message: 'Hello' };
  const result = { test, error };
  reporter.testFinished(result);
  assert(send.callCount === 1);
  assert(send.getCall(0).args[0].type === 'report-test-finished');
  assert.deepEqual(send.getCall(0).args[0].result, result);
}));
