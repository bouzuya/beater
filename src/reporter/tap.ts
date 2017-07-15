import { Test } from '../type/test';
import { TestReporter } from '../type/test-reporter';
import { TestResult } from '../type/test-result';

class TapLikeReporter {
  private tests: Test[];

  finished(_: TestResult[]): void {
    // do nothing
  }

  started(tests: Test[]): void {
    this.tests = tests;
    console.log('TAP version 13');
    console.log(`1..${tests.length}`);
  }

  testStarted(_: Test): void {
    // do nothing
  }

  testFinished({ error, test }: TestResult): void {
    const nameOrUndefined = test.meta.get('name');
    const name = typeof nameOrUndefined === 'undefined'
      ? '' : nameOrUndefined;
    const ok = typeof error === 'undefined' ? 'ok' : 'not ok';
    const no = this.tests.indexOf(test) + 1;
    console.log(`${ok} ${no} - ${name}`);
    if (typeof error !== 'undefined') {
      console.log('  ---');
      console.log('  name: ' + error.name);
      console.log('  message: ' + error.message);
      console.log('  stack: |');
      console.log('    ' + error.stack.split(/\n/).join('\n    '));
      console.log('  ...');
    }
  }
}

const reporter = (): TestReporter => {
  const r = new TapLikeReporter();
  return {
    finished: r.finished.bind(r),
    started: r.started.bind(r),
    testFinished: r.testFinished.bind(r),
    testStarted: r.testStarted.bind(r)
  };
};

export { reporter };
