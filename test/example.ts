import assert from 'power-assert';
import { test } from '../src';

const test1 = test('simple test', () => {
  assert(1 === 1);
});

const test2 = test('promise test', () => {
  return new Promise((resolve) => {
    assert(1 === 1);
    resolve();
  });
});

const test3 = test('async fn test', async () => {
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert(1 === 1);
});

const exampleTests = [test1, test2, test3];

export { exampleTests as tests };
