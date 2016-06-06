import * as childProcess from 'child_process';
import { EventEmitter } from 'events';
import { cpus } from 'os';
import * as path from 'path';
import { listupFiles } from './listup-files';
import { Message } from './message';
import { Options } from './options';
import { Reporter } from './reporter';

export class Beater extends EventEmitter {
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
    const dir = options.dir || `test/`;
    const ext = options.ext || '.js';
    const files = options.files || [];
    this.files = files.length > 0 ? files : listupFiles(dir, ext);
    this.pendingFiles = this.files.slice();
    this.finishedFiles = [];
    this.procs = options.procs || cpus().length;
    this.requires = options.requires || [];
    this.errors = {};
    this.on('next', this.nextFile.bind(this));
  }

  start(): void {
    this.reporter.started(this.files);
    this.pendingFiles
      .splice(0, this.procs)
      .forEach(file => this.emit('next', file));
  }

  private finish(): void {
    this.reporter.finished(this.files, this.errors);
    this.emit('finished', this.files, this.errors);
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
    const cp = childProcess.fork(file, args, { silent: true, execArgv: args });
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
