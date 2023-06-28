import { initCommentWidget } from './lib/comment';

const win = window as any;
if (win && !win.$chirpyDisableAutoInjection) {
  try {
    initCommentWidget();
  } catch (error) {
    console.error(`Failed to init comment widget: ${error}`);
  }

  win.$chirpy = {
    initCommentWidget,
  };
}

// Detect browser back/forward button, and in-page navigation
['hashchange', 'popstate'].forEach((eventName) => {
  window.addEventListener(eventName, function () {
    // Wait for page reload completed
    setTimeout(() => {
      try {
        initCommentWidget();
      } catch (error) {
        console.error(
          `Failed to init comment widget with in-page navigation: ${error}`,
        );
      }
    }, 5000);
  });
});
