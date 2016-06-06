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

test('run fixture/empty', () => {
  const sandbox = sinon.sandbox.create();
  const reporter = new MockReporter();
  const started = sandbox.stub(reporter, 'started');
  const finished = sandbox.stub(reporter, 'finished');
  const fileStarted = sandbox.stub(reporter, 'fileStarted');
  const fileFinished = sandbox.stub(reporter, 'fileFinished');
  const testStarted = sandbox.stub(reporter, 'testStarted');
  const testFinished = sandbox.stub(reporter, 'testFinished');
  const file = './.tmp/test/fixture/empty.js';
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
    assert(testStarted.callCount === 0);
    assert(testFinished.callCount === 0);
  });
});
