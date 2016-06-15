import { Promise } from '../globals/promise';

export interface FixtureHelperOptions<T, U> {
  before?: () => T | Promise<T>;
  after?: (context?: T, result?: U) => void | Promise<void>;
}
