import { Options } from '../../options';
import { Runner } from '../../runner';
import { Test } from '../../test';
import { FileRunner } from './file-runner';

export class ServerRunner implements Runner {
  private fileRunner: FileRunner;

  constructor() {
    this.fileRunner = new FileRunner();
  }

  add(test: Test<any>): void {
    this.fileRunner.add(test);
  }
}
