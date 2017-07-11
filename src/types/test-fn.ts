export interface TestFn {
  <T>(): void | T | Promise<T>;
}

export interface NormalizedTestFn {
  <T>(): Promise<T>;
  (): Promise<void>;
}
