import { Options } from '../../options';
import { Runner } from '../../runner';
import { Test } from '../../test';
import { FileRunner } from './file-runner';
import { FilesRunner } from './files-runner';

// Runner for Node.js
export class ServerRunner implements Runner {
  private fileRunner: FileRunner;

  constructor() {
    this.fileRunner = new FileRunner();
  }

  add(test: Test<any>): void {
    this.fileRunner.add(test);
  }

  run(options: Options): Promise<void> {
    return new FilesRunner(options).run();
  }
}
