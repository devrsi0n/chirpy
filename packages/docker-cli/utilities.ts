import { fs } from 'zx';
import crypto from 'crypto';
import YAML from 'yaml';
import path from 'path';

export async function parseYaml(cwdRelativePath: string) {
  return YAML.parse(await readCWDFile(cwdRelativePath));
}

export function getRandomString(byteSize: number) {
  return crypto.randomBytes(byteSize).toString('hex');
}

export function getCWDPath(...paths: string[]) {
  return path.resolve(process.cwd(), ...paths);
}

export function readCWDFile(cwdRelativePath: string) {
  return fs.readFile(getCWDPath(cwdRelativePath), 'utf8');
}

export function writeCWDFile(cwdRelativePath: string, data: any) {
  return fs.writeFile(getCWDPath(cwdRelativePath), data, {
    encoding: 'utf8',
  });
}

export function moveCWDFile(src: string, dest: string, options?: MoveOptions) {
  return fs.move(getCWDPath(src), getCWDPath(dest), {
    overwrite: true,
    ...options,
  });
}

export function removeCWDFile(cwdRelativePath: string) {
  return fs.remove(getCWDPath(cwdRelativePath));
}

export function doesPathExist(cwdRelativePath: string) {
  return fs.pathExists(getCWDPath(cwdRelativePath));
}

export function isValidDomain(domain: string): boolean {
  try {
    const url = new URL(`https://${domain}`);
    return url.hostname === domain;
  } catch {
    return false;
  }
}

interface MoveOptions {
  overwrite?: boolean | undefined;
  limit?: number | undefined;
}
