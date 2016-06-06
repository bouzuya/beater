import * as assert from 'power-assert';
import * as sinon from 'sinon';
import { test, Beater } from '../../src/';

class MockReporter {
  finished(files: string[], errors: { [file: string]: Error[]; }): void { }
  started(files: string[]): void { }
  fileFinished(file: string, errors: Error[]): void { }
  fileStarted(file: string): void { }
  testFinished(file: string, test: string, error?: Error): void { }
  testStarted(file: string, test: string): void { }
}

test('run fixture/failure', () => {
  const sandbox = sinon.sandbox.create();
  const reporter = new MockReporter();
  const started = sandbox.stub(reporter, 'started');
  const finished = sandbox.stub(reporter, 'finished');
  const fileStarted = sandbox.stub(reporter, 'fileStarted');
  const fileFinished = sandbox.stub(reporter, 'fileFinished');
  const testStarted = sandbox.stub(reporter, 'testStarted');
  const testFinished = sandbox.stub(reporter, 'testFinished');
  const file = './.tmp/test/fixture/failure.js';
  const beater = new Beater({ files: [file], reporter });
  return beater.start().catch(() => {
    const startedArgs = started.getCall(0).args;
    assert.deepEqual(startedArgs, [[file]]);
    const finishedArgs = finished.getCall(0).args;
    assert(finishedArgs.length === 2);
    assert.deepEqual(finishedArgs[0], [file]);
    assert(Object.keys(finishedArgs[1]).length === 1);
    assert(finishedArgs[1][file].length === 1);
    assert(finishedArgs[1][file][0].name === 'AssertionError');
    assert(finishedArgs[1][file][0].message === 'false == true');
    assert(finishedArgs[1][file][0].stack);
    const fileStartedArgs = fileStarted.getCall(0).args;
    assert.deepEqual(fileStartedArgs, [file]);
    const fileFinishedArgs = fileFinished.getCall(0).args;
    assert(fileFinishedArgs.length === 2);
    assert(fileFinishedArgs[0] === file);
    assert(fileFinishedArgs[1].length === 1);
    assert(fileFinishedArgs[1][0].name === 'AssertionError');
    assert(fileFinishedArgs[1][0].message === 'false == true');
    assert(fileFinishedArgs[1][0].stack);
    const testStartedArgs = testStarted.getCall(0).args;
    assert.deepEqual(testStartedArgs, [file, 'failure']);
    const testFinishedArgs = testFinished.getCall(0).args;
    assert(testFinishedArgs.length === 3);
    assert(testFinishedArgs[0] === file);
    assert(testFinishedArgs[1] === 'failure');
    assert(testFinishedArgs[2].name === 'AssertionError');
    assert(testFinishedArgs[2].message === 'false == true');
    assert(testFinishedArgs[2].stack);
  });
});
