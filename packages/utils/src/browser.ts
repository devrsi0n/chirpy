export function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

export function isFirefox() {
  return navigator.userAgent.toLowerCase().includes('firefox');
}
