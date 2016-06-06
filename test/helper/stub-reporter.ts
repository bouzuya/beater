export class StubReporter {
  finished(files: string[], errors: { [file: string]: Error[]; }): void { }
  started(files: string[]): void { }
  fileFinished(file: string, errors: Error[]): void { }
  fileStarted(file: string): void { }
  testFinished(file: string, test: string, error?: Error): void { }
  testStarted(file: string, test: string): void { }
}
