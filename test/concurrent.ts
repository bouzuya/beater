import assert from "power-assert";
import { Test, runWithOptions, TestResult } from "../src";
import * as fModule from "./concurrent/f";
import { g } from "./concurrent/g";
import { sandboxed, test } from "./helper";

const category = "concurrent - ";
const tests: Test[] = [
  test(category + "concurrent problem", async () => {
    return new Promise((resolve, reject) => {
      runWithOptions({
        reporter: {
          finished(results: TestResult[]): void {
            const errorResult = results.find(
              ({ error }) => typeof error !== "undefined"
            );
            if (typeof errorResult === "undefined") {
              resolve();
            } else {
              reject(errorResult.error);
            }
          },
          started(_tests: Test[]): void {
            // do nothing
          },
          testFinished(_result: TestResult): void {
            // do nothing
          },
          testStarted(_test: Test): void {
            // do nothing
          }
        }
      })([
        test(
          "1",
          sandboxed(async ({ sandbox }) => {
            const f = sandbox.stub(fModule, "f");
            await new Promise(resolve => setTimeout(resolve, 0));
            g();
            assert(f.callCount === 1);
          })
        ),
        test(
          "2",
          sandboxed(async ({ sandbox }) => {
            const f = sandbox.stub(fModule, "f");
            await new Promise(resolve => setTimeout(resolve, 0));
            g();
            assert(f.callCount === 1);
          })
        )
      ]);
    });
  })
];

export { tests };
