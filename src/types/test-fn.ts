export interface TestFn {
  <T>(): T | Promise<T>;
}
