import { Promise } from './globals/promise';

export type Test<T> = {
  name: string;
  test: () => T | Promise<T>;
};
