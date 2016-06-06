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

test('run success', () => {
  const sandbox = sinon.sandbox.create();
  const reporter = new MockReporter();
  const started = sandbox.stub(reporter, 'started');
  const finished = sandbox.stub(reporter, 'finished');
  const fileStarted = sandbox.stub(reporter, 'fileStarted');
  const fileFinished = sandbox.stub(reporter, 'fileFinished');
  const testStarted = sandbox.stub(reporter, 'testStarted');
  const testFinished = sandbox.stub(reporter, 'testFinished');
  const beater = new Beater({
    reporter,
    files: ['./.tmp/test/fixture/success.js']
  });
  return beater.start().then(() => {
    const startedArgs = started.getCall(0).args;
    assert.deepEqual(
      startedArgs,
      [
        ['./.tmp/test/fixture/success.js']
      ]);
    const finishedArgs = finished.getCall(0).args;
    assert.deepEqual(
      finishedArgs,
      [
        ['./.tmp/test/fixture/success.js'],
        { './.tmp/test/fixture/success.js': [] }
      ]);
    const fileStartedArgs = fileStarted.getCall(0).args;
    assert.deepEqual(
      fileStartedArgs,
      [
        './.tmp/test/fixture/success.js'
      ]);
    const fileFinishedArgs = fileFinished.getCall(0).args;
    assert.deepEqual(
      fileFinishedArgs,
      [
        './.tmp/test/fixture/success.js',
        []
      ]);
    const testStartedArgs = testStarted.getCall(0).args;
    assert.deepEqual(
      testStartedArgs,
      [
        './.tmp/test/fixture/success.js',
        'success'
      ]);
    const testFinishedArgs = testFinished.getCall(0).args;
    assert.deepEqual(
      testFinishedArgs,
      [
        './.tmp/test/fixture/success.js',
        'success',
        undefined
      ]);
  });
});
