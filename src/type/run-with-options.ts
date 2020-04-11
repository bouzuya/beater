import { Run } from "./run";
import { RunOptions } from "./run-options";

export interface RunWithOptions {
  (options: RunOptions): Run;
}
