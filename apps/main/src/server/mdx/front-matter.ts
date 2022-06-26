import { promises as fs } from 'fs';
import matter from 'gray-matter';

export async function getFrontMatters(
  filePath: string,
): Promise<matter.GrayMatterFile<string>> {
  const fileContent = await fs.readFile(filePath, 'utf8');
  const result = matter(fileContent);
  return result;
}
