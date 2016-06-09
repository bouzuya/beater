import * as childProcess from 'child_process';
import { EventEmitter } from 'events';
import { cpus } from 'os';
import * as path from 'path';
import { Message } from '../../message';
import { Options } from '../../options';
import { Reporter } from '../../reporter';

export class FilesRunner extends EventEmitter {
  private reporter: Reporter;
  private procs: number;
  private files: string[];
  private pendingFiles: string[];
  private finishedFiles: string[];
  private requires: string[];
  private errors: { [file: string]: Error[]; };

  constructor(options: Options) {
    super();
    this.reporter = options.reporter;
    this.files = options.files;
    this.pendingFiles = this.files.slice();
    this.finishedFiles = [];
    this.procs = options.procs || cpus().length;
    this.requires = options.requires || [];
    this.errors = {};
    this.on('next', this.nextFile.bind(this));
  }

  run(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.once('finish', (hasError: boolean) => {
        (hasError ? reject : resolve)();
      });
      this.reporter.started(this.files);
      this.pendingFiles
        .splice(0, this.procs)
        .forEach(file => this.emit('next', file));
    });
  }

  private finish(): void {
    this.reporter.finished(this.files, this.errors);
    const hasError = Object
      .keys(this.errors)
      .some(file => this.errors[file].length > 0);
    this.emit('finish', hasError);
  }

  private nextFile(file: string): void {
    this.reporter.fileStarted(file);
    this.errors[file] = [];
    this.runFile(file);
  }

  private runFile(file: string): void {
    const args = this.requires.reduce((args, require) => args.concat([
      '--require', require
    ]), []).concat([
      '--require', path.join(__dirname, 'abort-promise-exception')
    ]);
    const cp = childProcess.fork(file, [], { execArgv: args });
    cp.on('message', (m: Message) => {
      if (m.type === 'started') {
        this.reporter.testStarted(file, m.test);
      } else if (m.type === 'finished') {
        if (m.error) this.errors[file].push(m.error);
        this.reporter.testFinished(file, m.test, m.error);
      } else if (m.type === 'error') {
        this.errors[file].push(m.error);
      }
    });
    cp.on('close', () => {
      this.finishedFiles.push(file);
      this.reporter.fileFinished(file, this.errors[file]);
      if (this.pendingFiles.length > 0) {
        this.emit('next', this.pendingFiles.shift());
      } else if (this.finishedFiles.length === this.files.length) {
        this.finish();
      } else {
        // do nothing
      }
    });
  }
}
