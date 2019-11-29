import {
  Test,
  TestContext as TestContextOriginal,
  assert,
  group,
  test as testOriginal
} from './helper';
import * as import1Module from '../src/import-1';
import * as import2Module from '../src/import-2';
import { import1, import2 } from '../src/import';
import { SinonStub, SinonStubbedInstance } from 'sinon';

type TestContext = {
  c1: SinonStubbedInstance<import2Module.C1>;
  f1: SinonStub<[], number>;
} & TestContextOriginal;

const test = (
  name: string,
  fn: (context: TestContext) => Promise<void>
): Test => testOriginal(name, async (context) => {
  const { sandbox } = context;
  const f1 = sandbox.stub(import1Module, 'f1');
  const c1 = sandbox.createStubInstance(import2Module.C1);
  sandbox.stub(import2Module, 'C1').returns(c1);
  await fn({ ...context, c1, f1 });
});

const tests: Test[] = group('import/', [
  test('import1', async ({ f1 }) => {
    const value = 2;
    f1.returns(value);
    assert.deepStrictEqual(import1(), value);
    assert(f1.callCount === 1);
  }),

  test('import2', async ({ c1 }) => {
    import2();
    assert(c1.m1.callCount === 1);
  })
]);

export { tests as tests };
