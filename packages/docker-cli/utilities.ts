import { fs } from 'zx';
import crypto from 'crypto';
import YAML from 'yaml';
import path from 'path';

export async function parseYaml(filePath: string) {
  return YAML.parse(
    await fs.readFile(
      filePath.startsWith('./') || filePath.startsWith('../')
        ? path.resolve(__dirname, filePath)
        : filePath,
      'utf8',
    ),
  );
}

export function getRandomString(byteSize: number) {
  return crypto.randomBytes(byteSize).toString('hex');
}
