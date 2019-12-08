import { Test } from '../../src';

const namedTest = (name: string, fn: Test): Test => {
  Object.defineProperty(fn, 'name', {
    configurable: false,
    enumerable: true,
    value: name,
    writable: false
  });
  return fn;
};

export { namedTest };
