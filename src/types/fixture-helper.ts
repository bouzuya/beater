import { FixtureHelperOptions } from './fixture-helper-options';
import { NormalizedTestFn } from './test-fn';

export interface FixtureHelper {
  <T, U>(
    options: FixtureHelperOptions<T, U>,
    test: (context: T) => void | U | Promise<U>
  ): NormalizedTestFn;
}
