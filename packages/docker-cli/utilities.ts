import { fs } from 'zx';
import crypto from 'crypto';
import YAML from 'yaml';
import path from 'path';

export async function parseYaml(relativePath: string) {
  return YAML.parse(
    await fs.readFile(path.resolve(__dirname, relativePath), 'utf8'),
  );
}

export function getRandomString(byteSize: number) {
  return crypto.randomBytes(byteSize).toString('hex');
}
