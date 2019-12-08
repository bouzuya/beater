import { slowTest, slowTestFilter } from './slow-test';
import { namedTest } from './named-test';

const test = namedTest;

export {
  test as name,
  slowTest as slow,
  slowTestFilter,
  test
};
