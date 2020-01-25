import { Test } from '../../src';

const slowTestKey: symbol = Symbol();

const slowTest = (test: Test): Test => {
  Object.defineProperty(test as any, slowTestKey, {
    configurable: false,
    enumerable: false,
    value: true,
    writable: false
  });
  return test;
};

const slowTestFilter = (runSlowTests: boolean): ((test: Test) => boolean) =>
  runSlowTests ? (_) => true : (test) => (test as any)[slowTestKey] !== true;

export { slowTest, slowTestFilter };
