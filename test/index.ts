import assert from 'power-assert';
import { run, test } from '../src';
import { tests as runTests } from './run';
import { tests as runWithOptionsTests } from './run-with-options';
import { tests as testTests } from './test';
// import { tests as manyTests } from './many-test';

const test1 = test('simple test', () => {
  assert(1 === 1);
});

const test2 = test('async test', () => {
  return new Promise((resolve) => {
    assert(1 === 1);
    resolve();
  });
});

const exampleTests = [test1, test2];

run(
  exampleTests
    // .concat(manyTests)
    .concat(runTests)
    .concat(runWithOptionsTests)
    .concat(testTests)
).catch((_) => process.exit(1)); // test failed
