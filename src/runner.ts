import { Options } from './options';
import { Test } from './test';

export interface Runner {
  add(test: Test<any>): void;
  run(options: Options): Promise<void>;
}
