import { slate, violet } from '@radix-ui/colors';
import { Tailwind, TailwindProps } from '@react-email/components';

export type TWProps = {
  children: React.ReactNode;
};

export function TW(props: TWProps): JSX.Element {
  return <Tailwind config={config}>{props.children}</Tailwind>;
}

const config: TailwindProps['config'] = {
  theme: {
    colors: {
      primary: getRadixColor(violet, 'violet'),
      grey: getRadixColor(slate, 'slate'),
      white: '#fff',
      black: '#000',
      current: 'currentColor',
      transparent: 'transparent',
    },
  },
};

function getRadixColor(
  colors: Record<`${string}${number}`, string>,
  prefix: string,
): Record<number, string> {
  const result: Record<number, string> = {};
  for (let i = 1; i <= 12; i++) {
    const color = colors[`${prefix}${i}`];
    result[i * 100] = color;
  }
  return result;
}
