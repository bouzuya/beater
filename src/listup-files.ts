import * as fs from 'fs';
import * as path from 'path';

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

export { listupFiles };
