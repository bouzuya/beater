import * as assert from 'power-assert';
import * as sinon from 'sinon';
import { test, Beater } from '../../src/';
import { StubReporter } from '../helper/stub-reporter';

test('run fixture/success', () => {
  const sandbox = sinon.sandbox.create();
  const reporter = new StubReporter();
  const started = sandbox.stub(reporter, 'started');
  const finished = sandbox.stub(reporter, 'finished');
  const fileStarted = sandbox.stub(reporter, 'fileStarted');
  const fileFinished = sandbox.stub(reporter, 'fileFinished');
  const testStarted = sandbox.stub(reporter, 'testStarted');
  const testFinished = sandbox.stub(reporter, 'testFinished');
  const file = './.tmp/test/fixture/success.js';
  const beater = new Beater({ files: [file], reporter });
  return beater.start().then(() => {
    const startedArgs = started.getCall(0).args;
    assert.deepEqual(startedArgs, [[file]]);
    const finishedArgs = finished.getCall(0).args;
    assert.deepEqual(finishedArgs, [[file], { [file]: [] }]);
    const fileStartedArgs = fileStarted.getCall(0).args;
    assert.deepEqual(fileStartedArgs, [file]);
    const fileFinishedArgs = fileFinished.getCall(0).args;
    assert.deepEqual(fileFinishedArgs, [file, []]);
    const testStartedArgs = testStarted.getCall(0).args;
    assert.deepEqual(testStartedArgs, [file, 'success']);
    const testFinishedArgs = testFinished.getCall(0).args;
    assert.deepEqual(testFinishedArgs, [file, 'success', undefined]);
  });
});
