import * as assert from 'power-assert';
import * as sinon from 'sinon';
import { test, Beater } from '../../src/';
import { init } from '../helper/spy-reporter';

test('run fixture/success', () => {
  const sandbox = sinon.sandbox.create();
  const {
    reporter,
    started,
    finished,
    fileStarted,
    fileFinished,
    testStarted,
    testFinished
  } = init(sandbox);
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
