import fs from 'fs';
import path from 'path';

export function getRootDir(): string {
  const currentDir = module.paths.find((p) => fs.existsSync(path.join(p, '../package.json')));
  if (!currentDir) {
    throw new Error('Could not find root directory');
  }
  return path.resolve(currentDir, '..');
}
