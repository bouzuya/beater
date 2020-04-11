import assert from "power-assert";
import sinon from "sinon";
import { Test } from "../src";
import { test } from "./helper";

const category = "test() - ";
const tests: Test[] = [
  test(category + "name", () => {
    const name = "name1";
    const o = test(name, () => void 0);
    assert(o.name === "name1");
  }),
  test(category + "fn failure", () => {
    const error = new Error("hoge");
    const fn = sinon.stub().throws(error);
    const o = test("", fn);
    return Promise.resolve()
      .then(() => o())
      .then(
        () => assert.fail(),
        e => assert(e === error)
      );
  }),
  test(category + "fn failure (not Error)", () => {
    const error = 123;
    const fn = sinon.stub().throws(error);
    const o = test("", fn);
    return Promise.resolve()
      .then(() => o())
      .then(
        () => assert.fail(),
        e => assert(e === 123)
      );
  }),
  test(category + "fn success", () => {
    const fn = sinon.stub().returns(void 0);
    const o = test("", fn);
    return Promise.resolve()
      .then(() => o())
      .then(() => {
        assert(fn.callCount === 1);
        assert(fn.getCall(0).args.length === 0);
      });
  }),
  test(category + "fn promise failure", () => {
    const error = new Error("hoge");
    const fn = sinon.stub().returns(Promise.reject(error));
    const o = test("", fn);
    return Promise.resolve()
      .then(() => o())
      .then(
        () => assert.fail(),
        e => assert(e === error)
      );
  }),
  test(category + "fn promise success", () => {
    const fn = sinon.stub().returns(Promise.resolve());
    const o = test("", fn);
    return Promise.resolve()
      .then(() => o())
      .then(() => {
        assert(fn.callCount === 1);
        assert(fn.getCall(0).args.length === 0);
      });
  })
];

export { tests };
