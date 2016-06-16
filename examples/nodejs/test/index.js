const { assert, test } = require('./helper');
const add = require('../src/');

test('add', () => {
  assert(add(1, 2) === 3);
});

