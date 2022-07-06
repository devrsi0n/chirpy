import { initCommentWidget } from './lib/comment-bootstrapper';

const win = window as any;
if (win && !win.$chirpyDisableAutoInjection) {
  initCommentWidget();
  win.$chirpy = {
    initCommentWidget,
  };
}
