
import { Tailwind, TailwindProps } from '@react-email/components';
import convert from 'color-convert';
import { violet, slate} from '@radix-ui/colors'

export type TWProps = {
  children: React.ReactNode;
};

export function TW(props: TWProps): JSX.Element {
  return (
    <Tailwind
      config={config}
    >
      {props.children}
    </Tailwind>
  );
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
    }
  }
}

function getRadixColor(colors: Record<`${string}${number}`, string>, prefix: string): Record<number, string> {
  const result: Record<number, string>  = {};
  for (let i = 1; i <= 12; i++) {
    const color = colors[`${prefix}${i}`];
    const [, h, s, l] = /hsl\((\d+), ([\d.]+)%, ([\d.]+)%\)/.exec(color) || [];
    const rgb = convert.hsl
      .rgb([+h, +s, +l])
      .map((c) => c.toString(16))
      .join('');
    result[i * 100] = `#${rgb}`;
  }
  return result;
}
