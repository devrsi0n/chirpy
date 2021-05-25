import Slugger from 'github-slugger';
import path from 'path';

export const AUTH_COOKIE_NAME = `${process.env.NEXT_PUBLIC_APP_NAME}Auth`;
export const USER_COOKIE_NAME = `${process.env.NEXT_PUBLIC_APP_NAME}UID`;

export const POST_ROOT = path.resolve(process.cwd(), 'posts');
export const slugger = new Slugger();
