import type { Page } from '../graphql/generated/types';

/*
 * Widget entry for customers, this file should be minimal since this file is a external entry,
 * it built by parcel.
 */

const appNameLowerCase = process.env.NEXT_PUBLIC_APP_NAME.toLowerCase();

// User init a page by import a script
// <script defer src="/widget/comment.js" data-${NEXT_PUBLIC_APP_NAME}-pid="xxxx"><script>
// Render target: <div data-${NEXT_PUBLIC_APP_NAME}-comment></div>
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
  const { origin, pathname } = window.location;
  fetch(
    `${
      process.env.NEXT_PUBLIC_APP_URL
    }/api/get-page-by-project?projectId=${pid}&url=${encodeURIComponent(
      origin + pathname,
    )}&title=${encodeURIComponent(window.document.title)}`,
  )
    .then((res) => res.json())
    .then((page: Page | null) => {
      if (!page) {
        console.error('Unexpected null from response');
        return;
      }
      const id = getIframeId(page.id);
      if (window.document.querySelector(`#${id}`)) {
        return;
      }
      const container = document.createElement('iframe');
      container.src = `${process.env.NEXT_PUBLIC_APP_URL}/widget/comment/${page.id}`;
      container.id = id;
      container.style.width = '100%';
      container.frameBorder = '0';
      container.scrolling = 'no';
      let previousHeight = 0;
      container.addEventListener('load', function () {
        window.addEventListener(
          'message',
          (event) => {
            if (
              event.origin === process.env.NEXT_PUBLIC_APP_URL &&
              event.data?.height &&
              event.data?.height !== previousHeight
            ) {
              container.style.height = event.data.height + 'px';
              previousHeight = event.data.height;
            }
          },
          false,
        );
      });

      renderTarget.append(container);
    });
}

const getIframeId = (id: string) => `${appNameLowerCase}-${id}`;

if (typeof window !== 'undefined') {
  comment();
  (window as { [key: string]: $TsFixMe })[appNameLowerCase] = {
    comment,
  };
}
