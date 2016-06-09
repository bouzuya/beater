import { Options } from './options';
import { Runner } from './runner';
import { getRunner } from './helpers';

export class Beater {
  private options: Options;
  private runner: Runner;

  constructor(options: Options) {
    this.options = options;
    this.runner = getRunner();
  }

  start(): Promise<void> {
    return this.runner.run(this.options);
  }
}
