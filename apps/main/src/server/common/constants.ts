import Slugger from 'github-slugger';
import path from 'path';

export const POST_ROOT = path.resolve(process.cwd(), 'posts');
export const slugger = new Slugger();
