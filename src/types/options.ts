import { Reporter } from './reporter';

export interface Options {
  files: string[];
  procs?: number;
  reporter: Reporter;
  requires?: string[];
}

export interface ConfigFileOptions {
  dir?: string;
  ext?: string;
  files?: string[];
  procs?: number;
  reporter?: string;
  require?: string | string[];
}

export interface CommandLineOptions extends ConfigFileOptions {
  help?: boolean;
  version?: string;
}
