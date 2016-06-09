import { Test } from './test';

export interface Runner {
  add(test: Test<any>): void;
  // TODO: run
}
