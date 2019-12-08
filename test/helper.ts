import { Test } from '../src';

const test = (name: string, fn: Function): Function => {
  Object.defineProperty(fn, 'name', {
    configurable: false,
    enumerable: true,
    value: name,
    writable: false
  });
  return fn;
};

const slowTestKey: symbol = Symbol();

const slowTest = (name: string, fn: Function): Function => {
  const t = test(name, fn);
  Object.defineProperty(t as any, slowTestKey, {
    configurable: false,
    enumerable: false,
    value: true,
    writable: false
  });
  return t;
};

const slowTestFilter = (runSlowTests: boolean): ((test: Test) => boolean) =>
  runSlowTests
    ? (_) => true
    : (test) => (test as any)[slowTestKey] !== true;

export { slowTest, slowTestFilter, test };
