import { initCommentWidget } from './lib/comment-bootstrapper';

const win = window as any;
if (win && !win.$chirpyDisableAutoInjection) {
  initCommentWidget();
  win.$chirpy = {
    initCommentWidget,
  };
}

// Detech browser back/forward button, and in-page navigation
['hashchange', 'popstate'].forEach((eventName) => {
  window.addEventListener(eventName, function () {
    // Wait for page reload completed
    setTimeout(() => {
      initCommentWidget();
    }, 5000);
  });
});
