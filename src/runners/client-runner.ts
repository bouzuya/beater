import { Options } from '../options';
import { Reporter } from '../reporter';
import { Runner } from '../runner';
import { Test } from '../test';

// Runner for Browser
export class ClientRunner implements Runner {
  private tests: Test<any>[];

  constructor() {
    this.tests = [];
  }

  add(test: Test<any>): void {
    this.tests.push(test);
  }

  run(options: Options): Promise<void> {
    const files = options.files;
    const reporter = options.reporter;
    reporter.started(files);
    return this.runList<string, Error[]>(
      files, reporter, this.runFile.bind(this)
    )
      .then(errors => {
        const errorObj: { [file: string]: Error[]; } = files
          .map<[string, Error[]]>((file, index) => [file, errors[index]])
          .reduce<{ [file: string]: Error[]; }>((obj, [file, errors]) => {
            const filtered = errors.filter(i => typeof i !== 'undefined');
            return Object.assign(obj, { [file]: filtered });
          }, {});
        reporter.finished(files, errorObj);
      });
  }

  private load(file: string): Test<any>[] {
    this.tests = [];
    require('../../' + file); // update `this.tests`
    return this.tests;
  }

  private runFile(file: string, reporter: Reporter): Promise<Error[]> {
    reporter.fileStarted(file);
    return this.runList<Test<any>, Error>(
      this.load(file), reporter, (test, reporter) => {
        return this.runTest(file, test, reporter);
      })
      .then(errors => {
        const filtered = errors.filter(error => typeof error !== 'undefined');
        reporter.fileFinished(file, filtered);
        return errors;
      });
  }

  private runList<T, U>(
    items: T[],
    reporter: Reporter,
    f: (item: T, reporter: Reporter) => Promise<U>
  ): Promise<U[]> {
    return items.reduce((promise, item) => {
      return promise.then(results => {
        return f(item, reporter).then(result => results.concat([result]));
      });
    }, Promise.resolve([]));
  }

  private runTest(
    file: string,
    test: Test<any>,
    reporter: Reporter
  ): Promise<Error> {
    reporter.testStarted(file, test.name);
    return Promise
      .resolve()
      .then(test.test)
      .then(() => void 0, this.serializeError.bind(this))
      .then(error => {
        reporter.testFinished(file, test.name, error);
        return error;
      });
  }

  // FIXME
  private serializeError(error: any): Error {
    const e = (message: string): Error => {
      const name = 'Error';
      return { name, message };
    };
    if (typeof error === 'undefined') return e('Error is undefined');
    if (error === null) return e('Error is null');
    if (typeof error === 'string') return e(error);
    const { name, message, stack } = error;
    return { name, message, stack };
  }
}
