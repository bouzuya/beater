import { Test, assert, group, test } from './helper';
import {
  f1,
  f2,
  f3
} from '../src/function';

const typesTests: Test[] = group('function/', [
  test('f1', async () => {
    assert.deepStrictEqual(f1(), 1);
  }),

  test('f2', async () => {
    assert.deepStrictEqual(f2(1), 1);
  }),

  test('f3', async () => {
    assert.deepStrictEqual(f3(1, 2), 3);
  })

]);

export { typesTests as tests };
