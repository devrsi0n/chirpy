import * as React from 'react';

export function useNotifyHostHeightOfPage(): void {
  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      const newHeight: number = document.body.scrollHeight + 10;
      window.parent.postMessage({ height: newHeight }, '*');
    });
    observer.observe(window.document.body, { attributes: false, childList: true, subtree: false });
    return () => {
      observer.disconnect();
    };
  }, []);
}
