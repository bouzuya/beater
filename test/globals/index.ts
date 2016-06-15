import * as assert from 'power-assert';
import { test } from '../helper';
import { process, Promise } from '../../src/globals';

test('globals', () => {
  assert(process);
  assert(Promise);
});
