import { Promise } from '../globals';

export interface FixtureHelperOptions<T, U> {
  before?: () => T | Promise<T>;
  after?: (context?: T, result?: U) => void | Promise<void>;
}
