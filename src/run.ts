import { Error } from './type/error';
import { Run } from './type/run';
import { RunOptions } from './type/run-options';
import { RunWithOptions } from './type/run-with-options';
import { Test } from './type/test';
import { TestResult } from './type/test-result';
import { reporter as tapReporter } from './reporter/tap';

interface RunTest {
  (test: Test): Promise<TestResult>;
}

const error = (e: any): Error => {
  if (typeof e === 'object') {
    // ES: name (default: 'Error')
    const name: string = typeof e.name === 'undefined'
      ? 'Error' : e.name;
    // ES: message (default: '')
    const message: string = typeof e.message === 'undefined'
      ? '' : e.message;
    // Node.js: stack
    const stack: string = typeof e.stack === 'undefined'
      ? '' : e.stack;
    return { message, name, stack };
  } else {
    const name = 'Error';
    const message = String(e);
    const stack = '';
    return { message, name, stack };
  }
};

const callTestFn = (test: Test): Promise<TestResult> => {
  return test.fn()
    .then(() => ({ test }), (e) => ({ error: error(e), test }));
};

const nextTick = (): Promise<void> => {
  return new Promise((resolve) => process.nextTick(resolve));
};

const runTestWithOptions = (options: RunOptions): RunTest => {
  return (test: Test): Promise<TestResult> => {
    const { reporter } = options;
    return nextTick().then(() => {
      void reporter.testStarted(test);
      return callTestFn(test).then((result) => {
        void reporter.testFinished(result);
        return result;
      });
    });
  };
};

const runWithOptions: RunWithOptions = (options: RunOptions): Run => {
  return (tests: Test[]): Promise<TestResult[]> => {
    const { reporter } = options;
    reporter.started(tests);
    return Promise.all(
      tests.map(runTestWithOptions(options))
    ).then((results) => {
      reporter.finished(results);
      return results.some(({ error }) => typeof error !== 'undefined')
        ? Promise.reject(results)
        : Promise.resolve(results);
    });
  };
};

const run: Run = (tests: Test[]): Promise<TestResult[]> => {
  const defaultOptions = { reporter: tapReporter() };
  return runWithOptions(defaultOptions)(tests);
};

export { run, runWithOptions };
