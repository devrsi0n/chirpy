import { getColorFromCssVariable } from '../../utilities';

export async function revalidateProjectPages(
  projectId: string,
  domain: string,
) {
  return await Promise.allSettled([
    fetch(`/api/revalidate/widgets?projectId=${projectId}`),
    fetch(`/api/revalidate/theme?domain=${domain}`),
  ]);
}

export function getHexColorFromCssVariable(variable: string): string {
  // '210 20% 98%'
  const hslColor = getColorFromCssVariable(variable);
  if (!hslColor) {
    return '';
  }
  const [h, s, l] = hslColor.split(' ');
  return hslToHex(
    Number.parseInt(h, 10),
    Number.parseInt(s.replace('%', ''), 10),
    Number.parseInt(l.replace('%', ''), 10),
  );
}

/**
 * Convert hsl color to hex,
 * algorithm from https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB_alternative
 * @param hue [0-360]
 * @param saturation [0-100]
 * @param lightness [0-100]
 * @returns hex color
 */
export function hslToHex(
  hue: number,
  saturation: number,
  lightness: number,
): string {
  lightness /= 100;
  const a = (saturation * Math.min(lightness, 1 - lightness)) / 100;
  const fn = (n: number) => {
    const k = (n + hue / 30) % 12;
    const color = lightness - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${fn(0)}${fn(8)}${fn(4)}`;
}

/**
 * https://css-tricks.com/converting-color-spaces-in-javascript/#aa-hex-to-hsl
 * @param hex
 * @returns
 */
export function hexToHSL(hex: string): string {
  // Convert hex to RGB first
  let r = 0;
  let g = 0;
  let b = 0;
  if (hex.length == 4) {
    r = Number.parseInt('0x' + hex[1] + hex[1], 16);
    g = Number.parseInt('0x' + hex[2] + hex[2], 16);
    b = Number.parseInt('0x' + hex[3] + hex[3], 16);
  } else if (hex.length == 7) {
    r = Number.parseInt('0x' + hex[1] + hex[2], 16);
    g = Number.parseInt('0x' + hex[3] + hex[4], 16);
    b = Number.parseInt('0x' + hex[5] + hex[6], 16);
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let h = 0;
  let s = 0;
  let l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return `hsl(${h}, ${s}%, ${l}%)`;
}
