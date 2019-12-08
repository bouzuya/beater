import {
  Error,
  Test,
  TestResult
} from 'beater-reporter';
import { Run } from './type/run';
import { RunOptions } from './type/run-options';
import { RunWithOptions } from './type/run-with-options';

interface RunTest {
  (test: Test): Promise<TestResult>;
}

const parseStack = (stack: string | null): {
  columnNumber: number;
  fileName: string;
  lineNumber: number;
} | null => {
  if (stack === null) return null;
  const line = stack.split('\n')[1];
  if (typeof line === 'undefined') return null;
  const match = line.match(/^\s+at\s+([^:]+):(\d+):(\d+)$/);
  if (match === null) return null;
  const fileName = match[1];
  const lineNumber = parseInt(match[2], 10);
  const columnNumber = parseInt(match[3], 10);
  return { columnNumber, fileName, lineNumber };
};

const error = (e: any): Error => {
  if (typeof e === 'object') {
    const name: string = typeof e.name === 'string' ? e.name : 'Error';
    const message: string = typeof e.message === 'string' ? e.message : '';
    const stack = typeof e.stack === 'string' ? e.stack : null;
    const parsedStack = parseStack(stack);
    return {
      columnNumber: typeof e.columnNumber === 'number'
        ? e.columnNumber
        : parsedStack?.columnNumber ?? null,
      fileName: typeof e.fileName === 'string'
        ? e.fileName
        : parsedStack?.fileName ?? null,
      lineNumber: typeof e.lineNumber === 'number'
        ? e.lineNumber
        : parsedStack?.lineNumber ?? null,
      message,
      name,
      stack
    };
  } else {
    const name = 'Error';
    const message = String(e);
    return {
      columnNumber: null,
      lineNumber: null,
      fileName: null,
      message,
      name,
      stack: null
    };
  }
};

const callTestFn = async (test: Test): Promise<TestResult> => {
  try {
    await test();
    return ({ test });
  } catch (e) {
    return ({ error: error(e), test });
  }
};

const runTestWithOptions = (options: RunOptions): RunTest => {
  return async (test: Test): Promise<TestResult> => {
    const { reporter } = options;
    reporter.testStarted(test);
    const result = await callTestFn(test);
    reporter.testFinished(result);
    return result;
  };
};

const runWithOptions: RunWithOptions = (options: RunOptions): Run => {
  const runTest = runTestWithOptions(options);
  return async (tests: Test[]): Promise<TestResult[]> => {
    const { reporter } = options;
    reporter.started(tests);
    const results: TestResult[] = []; // mutable
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

export { runWithOptions };
