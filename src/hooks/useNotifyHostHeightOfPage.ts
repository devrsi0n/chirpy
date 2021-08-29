import * as React from 'react';

export function useNotifyHostHeightOfPage(): void {
  React.useEffect(() => {
    broadcastPageHeight();
    const observer = new MutationObserver(broadcastPageHeight);
    observer.observe(window.document.body, { attributes: false, childList: true, subtree: true });
    return () => {
      observer.disconnect();
    };
  }, []);
}

function broadcastPageHeight(): void {
  const newHeight: number = document.body.scrollHeight + 10;
  window.parent.postMessage({ height: newHeight }, '*');
}
