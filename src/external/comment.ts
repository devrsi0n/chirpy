import type { Page } from '@prisma/client';
/*
 * Widget entry for customers, this file should be minimal since this file is a external entry,
 * it built by parcel.
 */

const appNameLowerCase = process.env.NEXT_PUBLIC_APP_NAME.toLowerCase();

// User init a page by import a script
// <script defer src="/widget/comment.js" data-${NEXT_PUBLIC_APP_NAME}-pid="xxxx"><script>
// Render target: <div data-${NEXT_PUBLIC_APP_NAME}-comment="true"></div>
export function comment(): void {
  // Get page url and init this page with a correct iframe
  // <iframe src="/widget/comment/xxxxx/xxxxxx"><iframe>
  const script: HTMLScriptElement | null = window.document.querySelector(
    `[data-${appNameLowerCase}-pid]`,
  );
  if (!script) {
    console.error(`Can't find the comment script`);
    return;
  }
  const pid = script.dataset[`${appNameLowerCase}Pid`];
  if (!pid) {
    alert(`Please add the pid in your script`);
    return;
  }
  const renderTarget: HTMLElement | null = window.document.querySelector(
    `[data-${appNameLowerCase}-comment]`,
  );
  if (!renderTarget) {
    alert(`Can't find the render target`);
    return;
  }
  fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/get-page-by-project?projectId=${pid}&url=${window.location.origin}&title=${window.document.title}`,
  )
    .then((res) => res.json())
    .then((page: Page | null) => {
      if (!page) {
        console.error('Unexpected null from response');
        return;
      }
      const id = getIframeId(page.id);
      if (window.document.getElementById(id)) {
        return;
      }
      const container = document.createElement('iframe');
      container.src = `${process.env.NEXT_PUBLIC_APP_URL}/widget/comment/${page.id}`;
      container.id = id;
      container.style.width = '100%';
      container.frameBorder = '0';
      container.scrolling = 'no';
      let previousHeight = 0;
      container.onload = function () {
        previousHeight = setIframeHeight(container, previousHeight);
        window.addEventListener(
          'message',
          (event) => {
            if (
              origin === process.env.NEXT_PUBLIC_APP_URL &&
              event.data?.height &&
              event.data?.height !== previousHeight
            ) {
              container.style.height = event.data.height + 'px';
              previousHeight = event.data.height;
            }
          },
          false,
        );
      };

      renderTarget.appendChild(container);
    });
}

const getIframeId = (id: string) => `${appNameLowerCase}-${id}`;

if (typeof window !== 'undefined') {
  comment();
  (window as { [key: string]: $TsFixMe })[appNameLowerCase] = {
    comment,
  };
}

function setIframeHeight(iframe: HTMLIFrameElement, previousHeight: number): number {
  const doc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!doc) {
    throw new Error(`Can't find the iframe document`);
  }
  const newHeight: number = doc.body.scrollHeight + 10;
  if (newHeight !== previousHeight) {
    iframe.style.height = newHeight + 'px';
  }
  return newHeight;
}
