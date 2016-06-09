export type Test<T> = {
  name: string;
  test: () => T | Promise<T>;
};
