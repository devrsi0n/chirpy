import { initCommentWidget } from './lib/comment-bootstrapper';
import { loadFlock } from './lib/load-flock';

const win = window as any;
if (win && !win.$chirpyDisableAutoInjection) {
  initCommentWidget();
  loadFlock();
  win.$chirpy = {
    initCommentWidget,
    loadFlock,
  };
}

// Detect browser back/forward button, and in-page navigation
['hashchange', 'popstate'].forEach((eventName) => {
  window.addEventListener(eventName, function () {
    // Wait for page reload completed
    setTimeout(() => {
      initCommentWidget();
      loadFlock();
    }, 5000);
  });
});
