import { Test, TestResult } from 'beater-reporter';
import { reporter as tapReporter } from 'beater-tap-reporter';
import { Run } from './type/run';
import { runWithOptions } from './run-with-options';

const run: Run = (tests: Test[]): Promise<TestResult[]> => {
  const defaultOptions = { reporter: tapReporter() };
  return runWithOptions(defaultOptions)(tests);
};

export { run };
