import { Test } from "../../src";

const slowTestKey = Symbol();

const slowTest = (test: Test): Test => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.defineProperty(test as any, slowTestKey, {
    configurable: false,
    enumerable: false,
    value: true,
    writable: false,
  });
  return test;
};

const slowTestFilter = (runSlowTests: boolean): ((test: Test) => boolean) =>
  runSlowTests
    ? (_): boolean => true
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (test): boolean => (test as any)[slowTestKey] !== true;

export { slowTest, slowTestFilter };
