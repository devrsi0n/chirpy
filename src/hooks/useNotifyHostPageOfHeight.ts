import * as React from 'react';

// export type useNotifyHostPageOfHeightOptions = {};

export function useNotifyHostPageOfHeight(/* props: useNotifyHostPageOfHeightOptions */): void {
  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      const newHeight: number = document.body.scrollHeight + 10;
      window.parent.postMessage({ height: newHeight }, '*');
    });
    observer.observe(window.document.body, { attributes: true, childList: true, subtree: true });
    return () => {
      observer.disconnect();
    };
  }, []);
}
