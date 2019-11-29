import assert from 'assert';
import { Test, run, test as testOriginal } from 'beater';
import { SinonSandbox, createSandbox } from 'sinon';

type TestContext = { sandbox: SinonSandbox; };
const group = (name: string, tests: Test[]): Test[] =>
  tests.map(({ fn, meta }) => test(name + meta.get('name'), fn));

const test = (
  name: string,
  fn: (context: TestContext) => Promise<void>
): Test => testOriginal(name, async () => {
  const sandbox = createSandbox();
  try {
    await fn({ sandbox });
  } finally {
    sandbox.restore();
  }
});

export { Test, TestContext, assert, group, run, test };
