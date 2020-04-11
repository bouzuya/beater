import { sandboxedTest } from "./sandboxed-test";
import { slowTest, slowTestFilter } from "./slow-test";
import { namedTest } from "./named-test";

const test = namedTest;

export {
  test as named,
  sandboxedTest as sandboxed,
  slowTest as slow,
  slowTestFilter,
  test,
};
