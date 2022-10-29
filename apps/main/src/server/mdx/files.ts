import { Directory, FileStructure } from '@chirpy-dev/types';
import { promises as fs } from 'fs';
import path from 'path';

import { POST_ROOT } from '../common/constants';
import { getFrontMatters } from './front-matter';

const ignoreFileList = new Set(['meta.json']);

export async function getAllFileStructures(
  subFolder: string,
): Promise<FileStructure[]> {
  const fileStructures = [];
  for await (const f of getFileStructures(
    path.resolve(POST_ROOT, subFolder),
    path.resolve(POST_ROOT, subFolder),
  )) {
    fileStructures.push(f);
  }
  return fileStructures;
}

async function* getFileStructures(
  dir: string,
  relativeRoot: string,
): AsyncGenerator<FileStructure> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFileStructures(res, relativeRoot);
    } else if (ignoreFileList.has(dirent.name)) {
      continue;
    } else {
      yield {
        slug: dirent.name.replace('.mdx', ''),
        ancestors: path.relative(relativeRoot, path.dirname(res)).split('/'),
        path: res,
      };
    }
  }
}

export async function getDirectories(
  subFolder: string,
  routePrefix: string,
): Promise<Directory[]> {
  const directories: Directory[] = [];
  const metaPath = path.join(POST_ROOT, subFolder, 'meta.json');
  // eslint-disable-next-line unicorn/prefer-json-parse-buffer
  const metaContent = await fs.readFile(metaPath, 'utf8');
  const { directories: orderedDirectories } = JSON.parse(metaContent) as {
    directories: string[];
  };
  for (const dirRelativePath of orderedDirectories) {
    const dirAbsolutePath = path.resolve(POST_ROOT, subFolder, dirRelativePath);
    const routePath = dirRelativePath.replace('.mdx', '');
    if (dirRelativePath.includes('/')) {
      let dirPoint = directories;
      for (const dirPath of dirRelativePath.split('/')) {
        const dir = dirPoint.find((_d) => _d.title === dirPath);
        if (dirPath.endsWith('.mdx')) {
          const {
            data: { title, banner = null },
          } = await getFrontMatters(dirAbsolutePath);
          dirPoint.push({
            title,
            banner,
            route: path.resolve(routePrefix, routePath),
          });
        } else if (dir) {
          dirPoint = dir.children || [];
        } else {
          const payload = {
            title: dirPath,
            children: [],
          };
          dirPoint.push(payload);
          dirPoint = payload.children;
        }
      }
    } else {
      const {
        data: { title, banner = null },
      } = await getFrontMatters(dirAbsolutePath);
      directories.push({
        title,
        banner,
        route: path.resolve(routePrefix, routePath),
      });
    }
  }

  return directories;
}
