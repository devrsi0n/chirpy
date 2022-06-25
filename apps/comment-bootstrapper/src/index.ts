import { initCommentWidget } from './lib/comment-bootstrapper';

const win = window as any;
if (win && !win.$chirpyDisableAutoInjection) {
  window.addEventListener('load', () => {
    initCommentWidget();
  });

  win.$chirpy = {
    initCommentWidget,
  };
}
