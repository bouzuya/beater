import {
  Error,
  Test,
  TestResult
} from 'beater-reporter';
import { Run } from './type/run';
import { RunOptions } from './type/run-options';
import { RunWithOptions } from './type/run-with-options';
import { reporter as tapReporter } from 'beater-tap-reporter';

interface RunTest {
  (test: Test): Promise<TestResult>;
}

const error = (e: any): Error => {
  if (typeof e === 'object') {
    // ES: name (default: 'Error')
    const name: string = e.name ?? 'Error';
    // ES: message (default: '')
    const message: string = e.message ?? '';
    // Node.js: stack
    const stack: string = e.stack ?? '';
    return { message, name, stack };
  } else {
    const name = 'Error';
    const message = String(e);
    const stack = '';
    return { message, name, stack };
  }
};

const callTestFn = async (test: Test): Promise<TestResult> => {
  try {
    await test.fn();
    return ({ test });
  } catch (e) {
    return ({ error: error(e), test });
  }
};

const nextTick = (): Promise<void> => {
  return new Promise((resolve) => process.nextTick(resolve));
};

const runTestWithOptions = (options: RunOptions): RunTest => {
  return async (test: Test): Promise<TestResult> => {
    const { reporter } = options;
    await nextTick();
    reporter.testStarted(test);
    const result = await callTestFn(test);
    reporter.testFinished(result);
    return result;
  };
};

const runWithOptions: RunWithOptions = (options: RunOptions): Run => {
  return async (tests: Test[]): Promise<TestResult[]> => {
    const { reporter } = options;
    reporter.started(tests);
    const runTest = runTestWithOptions(options);
    const results: TestResult[] = [];
    await tests.reduce(async (promise, test) => {
      await promise;
      const result = await runTest(test);
      results.push(result);
    }, Promise.resolve());
    reporter.finished(results);
    return results.some(({ error }) => typeof error !== 'undefined')
      ? Promise.reject(results)
      : Promise.resolve(results);
  };
};

const run: Run = (tests: Test[]): Promise<TestResult[]> => {
  const defaultOptions = { reporter: tapReporter() };
  return runWithOptions(defaultOptions)(tests);
};

export { run, runWithOptions };
