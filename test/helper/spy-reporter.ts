import * as sinon from 'sinon';
import { Reporter } from '../../src/reporter';

class SpyReporter {
  finished(files: string[], errors: { [file: string]: Error[]; }): void { }
  started(files: string[]): void { }
  fileFinished(file: string, errors: Error[]): void { }
  fileStarted(file: string): void { }
  testFinished(file: string, test: string, error?: Error): void { }
  testStarted(file: string, test: string): void { }
}

const init = (sandbox: sinon.SinonSandbox): {
  reporter: Reporter;
  started: sinon.SinonStub;
  finished: sinon.SinonStub;
  fileStarted: sinon.SinonStub;
  fileFinished: sinon.SinonStub;
  testStarted: sinon.SinonStub;
  testFinished: sinon.SinonStub;
} => {
  const reporter = new SpyReporter();
  const started = sandbox.stub(reporter, 'started');
  const finished = sandbox.stub(reporter, 'finished');
  const fileStarted = sandbox.stub(reporter, 'fileStarted');
  const fileFinished = sandbox.stub(reporter, 'fileFinished');
  const testStarted = sandbox.stub(reporter, 'testStarted');
  const testFinished = sandbox.stub(reporter, 'testFinished');
  return {
    reporter,
    started,
    finished,
    fileStarted,
    fileFinished,
    testStarted,
    testFinished
  };
};

export { init };
