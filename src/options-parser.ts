import * as minimist from 'minimist';
import * as existsSync from 'exists-sync';
import * as path from 'path';
import * as colo from 'colo';
import * as fs from 'fs';
import * as JSON5 from 'json5';
import { Reporter } from './reporter';
import { ConfigFileOptions, CommandLineOptions } from './options';

const loadRcOptions = (configFile: string): ConfigFileOptions => {
  if (!existsSync(configFile)) return {};
  const config = fs.readFileSync(configFile, { encoding: 'utf-8' });
  return JSON5.parse(config) || {};
};

const loadPackageOptions = (cwd: string): ConfigFileOptions => {
  const file = `${cwd}/package.json`;
  if (!existsSync(file)) return {};
  const packageJson = fs.readFileSync(file, { encoding: 'utf-8' });
  return JSON.parse(packageJson)['beater'] || {};
};

const loadCommandLineOptions = (
  argv: minimist.ParsedArgs,
  execArgv: minimist.ParsedArgs
): CommandLineOptions => {
  const require: string[] = typeof argv['require'] === 'undefined'
    ? []
    : [argv['require']];
  const execRequire: string[] = typeof argv['require'] === 'undefined'
    ? []
    : [execArgv['require']];
  Array.prototype.push.apply(require, execRequire);
  return {
    reporter: argv['reporter'],
    dir: argv['dir'],
    ext: argv['ext'],
    procs: Number(argv['procs']),
    require: require.length === 0 ? undefined : require,
    help: argv['help'] || argv['h'],
    version: argv['version'] || argv['v'],
    files: argv._
  };
};

const removeUndefinedKeys = (obj: any): void => {
  Object
    .keys(obj)
    .forEach(key => {
      if (typeof obj[key] === 'undefined') {
        delete obj[key];
      }
    });
};

const optionsParser = (
  argv: minimist.ParsedArgs,
  execArgv: minimist.ParsedArgs,
  cwd: string
): CommandLineOptions => {
  const configFile = argv['beaterrc'] || path.join(cwd, '.beaterrc');

  const defaultOptions = {
    dir: 'test/',
    ext: '.js',
    files: <string[]>undefined,
    procs: <number>undefined,
    reporter: <string>undefined,
    require: <string | string[]>undefined
  };

  // .beaterrc
  const rcOptions = loadRcOptions(configFile);
  removeUndefinedKeys(rcOptions);

  // package.json
  const packageOptions = loadPackageOptions(cwd);
  removeUndefinedKeys(packageOptions);

  // command-line
  const commandLineOptions = loadCommandLineOptions(argv, execArgv);
  removeUndefinedKeys(commandLineOptions);

  return Object.assign(
    defaultOptions,
    rcOptions,
    packageOptions,
    commandLineOptions
  );
};

export { optionsParser };
