import { Test, assert, group, test } from './helper';
import {
  undefined1,
  null1,
  boolean1,
  number1,
  string1,
  symbol1,
  object1
} from '../src/types';

const tests: Test[] = group('types/', [
  test('undefined', async () => {
    assert.deepStrictEqual(undefined1, undefined);
  }),

  test('null', async () => {
    assert.deepStrictEqual(null1, null);
  }),

  test('boolean', async () => {
    assert.deepStrictEqual(boolean1, true);
  }),

  test('number', async () => {
    assert.deepStrictEqual(number1, 123);
  }),

  test('string', async () => {
    assert.deepStrictEqual(string1, 'abc');
  }),

  test('symbol', async () => {
    assert.deepStrictEqual(symbol1, symbol1);
  }),

  test('object', async () => {
    assert.deepStrictEqual(object1, { number2: 1, string2: 'a' });
  })
]);

export { tests };
