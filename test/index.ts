import { run } from '../src';
import { tests as concurrentTests } from './concurrent';
import { tests as exampleTests } from './example';
// import { tests as manyTests } from './many-test';
import { tests as runTests } from './run';
import { tests as runWithOptionsTests } from './run-with-options';
import { tests as testTests } from './test';

run([
  ...concurrentTests,
  ...exampleTests,
  // ...manyTests,
  ...runTests,
  ...runWithOptionsTests,
  ...testTests
]).catch((_) => process.exit(1));
