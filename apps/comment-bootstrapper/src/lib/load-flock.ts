const ID = 'chirpy-ats';

export function loadFlock() {
  if (document.querySelector(`#${ID}`)) {
    return;
  }
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/@tinybirdco/flock.js';
  script.dataset.proxy = process.env.NEXT_PUBLIC_APP_URL || '';
  script.setAttribute('id', ID);
  document.body.append(script);
}
