const THOUSAND = 1000;
const HUNDRED_THOUSAND = 100_000;
const MILLION = 1_000_000;
const HUNDRED_MILLION = 100_000_000;
const BILLION = 1_000_000_000;
const HUNDRED_BILLION = 100_000_000_000;
const TRILLION = 1_000_000_000_000;

export default function numberFormatter(num: number) {
  if (num >= THOUSAND && num < MILLION) {
    const thousands = num / THOUSAND;
    return thousands === Math.floor(thousands) || num >= HUNDRED_THOUSAND
      ? Math.floor(thousands) + 'k'
      : Math.floor(thousands * 10) / 10 + 'k';
  } else if (num >= MILLION && num < BILLION) {
    const millions = num / MILLION;
    return millions === Math.floor(millions) || num >= HUNDRED_MILLION
      ? Math.floor(millions) + 'M'
      : Math.floor(millions * 10) / 10 + 'M';
  } else if (num >= BILLION && num < TRILLION) {
    const billions = num / BILLION;
    return billions === Math.floor(billions) || num >= HUNDRED_BILLION
      ? Math.floor(billions) + 'B'
      : Math.floor(billions * 10) / 10 + 'B';
  } else {
    return num;
  }
}

function pad(num: number, size: number) {
  return ('000' + num).slice(size * -1);
}

export function durationFormatter(duration: number) {
  const hours = Math.floor(duration / 60 / 60);
  const minutes = Math.floor(duration / 60) % 60;
  const seconds = Math.floor(duration - minutes * 60 - hours * 60 * 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${pad(seconds, 2)}s`;
  } else {
    return `${seconds}s`;
  }
}
