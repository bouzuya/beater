import { run, Test } from '../src';
import { tests as concurrentTests } from './concurrent';
import { tests as exampleTests } from './example';
import { tests as manyTests } from './many-test';
import { tests as runTests } from './run';
import { tests as runWithOptionsTests } from './run-with-options';
import { tests as testTests } from './test';
import { slowTestFilter } from './helper';

const tests: Test[] = [
  ...concurrentTests,
  ...exampleTests,
  ...manyTests,
  ...runTests,
  ...runWithOptionsTests,
  ...testTests
]
  .filter(slowTestFilter(typeof process.env.RUN_SLOW_TEST !== 'undefined'));

run(tests).catch((_) => process.exit(1));
