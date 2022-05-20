import { comment } from './lib/comment-bootstrapper';

const win = window as any;
if (win && !win.$chirpyDisableAutoInjection) {
  comment();
  win.$chirpy = {
    comment,
  };
}
