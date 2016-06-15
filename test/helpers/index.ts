import * as assert from 'power-assert';
import { test } from '../helper';
import { initFixture, initTest } from '../../src/helpers';

test('helpers', () => {
  assert(initFixture);
  assert(initTest);
});
