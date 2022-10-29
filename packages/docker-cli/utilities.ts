import crypto from 'crypto';
import path from 'path';
import * as webPush from 'web-push';
import YAML from 'yaml';
import { fs } from 'zx';

export async function parseYaml(cwdRelativePath: string) {
  return YAML.parse(await readCWDFile(cwdRelativePath));
}

export function getCWDPath(...paths: string[]) {
  return path.resolve(process.cwd(), ...paths);
}

export function getRelativePath(...paths: string[]) {
  return path.resolve(__dirname, ...paths);
}

export function readCWDFile(cwdRelativePath: string) {
  return fs.readFile(getCWDPath(cwdRelativePath), 'utf8');
}

export function readRelativeFile(relativePath: string) {
  return fs.readFile(getRelativePath(relativePath), 'utf8');
}

export function writeCWDFile(cwdRelativePath: string, data: any) {
  return fs.writeFile(getCWDPath(cwdRelativePath), data, {
    encoding: 'utf8',
  });
}

export function writeRelativeFile(relativePath: string, data: any) {
  return fs.writeFile(getRelativePath(relativePath), data, {
    encoding: 'utf8',
  });
}

export interface MoveOptions {
  overwrite?: boolean | undefined;
  limit?: number | undefined;
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

export function generateSecreats() {
  const hasuraAdminSecret = getRandomString(32);
  const hasuraJwtSecret = getRandomString(129);
  const hasuraEventSecret = getRandomString(32);
  const vapidKeys = webPush.generateVAPIDKeys();
  return {
    hasuraAdminSecret,
    hasuraJwtSecret,
    hasuraEventSecret,
    vapidKeys,
  };
}

function getRandomString(byteSize: number) {
  return crypto.randomBytes(byteSize).toString('hex');
}
