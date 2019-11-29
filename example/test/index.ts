import { Test, group, run } from './helper';
import { tests as functionTests } from './function';
import { tests as importTests } from './import';
import { tests as typesTests } from './types';

const tests: Test[] = group('/', [
  ...functionTests,
  ...importTests,
  ...typesTests
]);

run(tests).catch(() => process.exit(1));
