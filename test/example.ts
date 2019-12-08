import assert from 'power-assert';

const test1 = function simple_test() {
  assert(1 === 1);
};

const test2 = function promise_test() {
  return new Promise((resolve) => {
    assert(1 === 1);
    resolve();
  });
};

const test3 = async function async_fn_test() {
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert(1 === 1);
};

const exampleTests = [test1, test2, test3];

export { exampleTests as tests };
