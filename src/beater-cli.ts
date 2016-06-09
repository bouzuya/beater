import * as minimist from 'minimist';
import * as existsSync from 'exists-sync';
import * as fs from 'fs';
import * as path from 'path';
import { Beater } from './beater';
import { Reporter } from './reporter';
import { optionsParser } from './options-parser';
import { process } from './process';

const listupFiles = (dir: string, ext: string): string[] => {
  return fs
    .readdirSync(dir)
    .map(file => path.join(dir, file))
    .reduce((files: string[], file: string) => {
      return fs.statSync(file).isDirectory()
        ? files.concat(listupFiles(file, ext))
        : file.endsWith(ext)
          ? files.concat([file])
          : files;
    }, []);
};

const help = (): string => {
  return `
    beater [--dir test directroy default 'test/'] [--ext test file extension default '.js'] [--reporter fooreporter] [--procs max process number default cpu core num] [--require prerequire modules]
    beater --dir test/lib
    beater --dir spec --ext .js
    beater --dir test/lib --ext .test.js
    beater --dir test/lib --ext .test.js --reporter SomeCustomReporter
    beater --dir test/lib --ext .test.js --procs 10
    beater --require foo/bar
    beater --beaterrc example/dir/.beaterrc
    beater test/foo.js test/bar.js test/buz.js
  `;
};

const requireReporter = (reporterName: string): Reporter => {
  const obj = require(reporterName);
  return new (obj && obj.__esModule ? obj['default'] : obj);
};

const version = (): string => {
  const packageJson = fs.readFileSync('../package.json', { encoding: 'utf-8' });
  const pack = JSON.parse(packageJson);
  return pack.version;
};

const run = (): void => {
  const execArgv = minimist(process.execArgv);
  const argv = minimist(process.argv.slice(2));
  const opts = optionsParser(argv, execArgv, process.cwd());

  if (opts.help) {
    console.log(help());
    process.exit(0);
  }

  if (opts.version) {
    console.log(version());
    process.exit(0);
  }

  const reporterName = opts.reporter ? opts.reporter : 'beater-reporter';
  const reporter = requireReporter(reporterName);

  const requires = (
    typeof opts.require === 'string'
      ? [<string>opts.require]
      : opts.require
        ? <string[]>opts.require
        : []
  ).map(r => {
    const isLocalFile = existsSync(r) || existsSync(r + '.js');
    return isLocalFile ? path.resolve(r) : r;
  });
  requires.forEach(moduleName => require(moduleName));

  const dir = opts.dir || 'test/';
  const ext = opts.ext || '.js';
  const files = (opts.files || []).length > 0
    ? opts.files : listupFiles(dir, ext);

  const beater = new Beater({
    files,
    procs: opts.procs,
    reporter,
    requires
  });
  beater.start().catch(() => process.exit(1));
};

export { run };
