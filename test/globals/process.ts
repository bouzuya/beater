import * as assert from 'power-assert';
import { test } from '../helper';
import { process } from '../../src/globals/process';

test('globals/process', () => {
  assert(process);
  // assert(process.send);
  assert(process.on);
  assert(process.nextTick);
});
