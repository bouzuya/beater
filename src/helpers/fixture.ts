import { Promise } from '../globals/promise';

export type FixtureOptions<T, U> = {
  before?: () => T | Promise<T>;
  after?: (context?: T, result?: U) => void | Promise<void>;
};

export type FixtureHelper = <T, U>(
  options: FixtureOptions<T, U>,
  test: (context?: T) => U | Promise<U>
) => () => Promise<void>;

const p = (f: Function, ...args: any[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    Promise.resolve(f.apply(void 0, args)).then(resolve, reject);
  });
};

const fixture: FixtureHelper = <T, U>(
  options: {
    before?: () => T | Promise<T>;
    after?: (context?: T, result?: U) => void | Promise<void>;
  },
  test: (context?: T) => U | Promise<U>
): () => Promise<void> => {
  const before = options.before ? options.before : (): T => void 0;
  const after = options.after ? options.after : (): void => void 0;
  return () =>
    p(before).then(
      c => p(test, c).then(
        r => p(after, c, r),
        e => p(after, c, void 0).then(
          () => e ? Promise.reject(e) : void 0)));
};

const init = (): FixtureHelper => fixture;

export { init };
