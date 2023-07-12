import { Crisp } from 'crisp-sdk-web';
import { useEffect } from 'react';

export function CrispChat() {
  useEffect(() => {
    Crisp.configure('21441beb-25b5-46f7-896d-3af6aeaeda4c');
    // Show chat again when navigating back
    Crisp.chat.show();
    return () => {
      // Hide chat when in-page nav
      Crisp.chat.hide();
    };
  }, []);

  return <></>;
}
