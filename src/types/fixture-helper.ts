import { FixtureHelperOptions } from './fixture-helper-options';
import { Promise } from '../globals/promise';

export interface FixtureHelper {
  <T, U>(
    options: FixtureHelperOptions<T, U>,
    test: (context?: T) => U | Promise<U>
  ): () => Promise<void>;
}
