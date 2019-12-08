import assert from 'power-assert';
import sinon from 'sinon';
import { Test, runWithOptions, TestResult } from '../src';
import * as fModule from './concurrent/f';
import { g } from './concurrent/g';
import { test } from './helper';

const category = 'concurrent - ';
const tests: Test[] = [
  test(category + 'concurrent problem', async () => {
    return new Promise((resolve, reject) => {
      runWithOptions({
        reporter: {
          finished(results: TestResult[]) {
            const errorResult =
              results.find(({ error }) => typeof error !== 'undefined');
            if (typeof errorResult === 'undefined') {
              resolve();
            } else {
              reject(errorResult.error);
            }
          },
          started(_tests: Test[]) { },
          testFinished(_result: TestResult) { },
          testStarted(_test: Test) { }
        }
      })([
        test('1', async () => {
          const sandbox = sinon.createSandbox();
          const f = sandbox.stub(fModule, 'f');
          await new Promise((resolve) => setTimeout(resolve, 0));
          g();
          assert(f.callCount === 1);
          sandbox.restore();
        }),
        test('2', async () => {
          const sandbox = sinon.createSandbox();
          const f = sandbox.stub(fModule, 'f');
          await new Promise((resolve) => setTimeout(resolve, 0));
          g();
          assert(f.callCount === 1);
          sandbox.restore();
        })
      ]);
    });
  })
];

export { tests };
