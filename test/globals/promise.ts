import * as assert from 'power-assert';
import { test } from '../helper';
import { Promise } from '../../src/globals/promise';

test('globals/promise', () => {
  assert(Promise);
  assert(Promise.resolve);
  assert(Promise.reject);
  return new Promise((_, reject) => {
    reject(new Error('Hello'));
  }).catch(error => {
    assert(error.message === 'Hello');
  });
});
