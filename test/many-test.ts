import assert from 'power-assert';
import { Test } from '../src';
import { test } from './helper';

const tests: Test[] = []; // mutable
for (let i = 0; i < 100000; i++) {
  tests.push(test(`test${i + 1}`, () => assert(1 === 1)));
}

export { tests };
