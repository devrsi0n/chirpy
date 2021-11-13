import type { Icon } from '@geist-ui/react-icons';
import Code from '@geist-ui/react-icons/code';
import Figma from '@geist-ui/react-icons/figma';
import Lock from '@geist-ui/react-icons/lock';
import 'twin.macro';

import { Heading } from '$/components/Heading';
import { Text } from '$/components/Text';

const contents: FeatureProps[] = [
  {
    heading: 'Theme',
    content:
      'Widgets can be customized easily. You can customize styles to match your design system. ✨',
    icon: Figma,
  },
  {
    heading: 'Privacy friendly',
    content: `We take privacy very seriously. We even built a custom telemetry system to avoid share your and your customer's data with third party companies.`,
    icon: Lock,
  },
  {
    heading: 'Open source',
    content:
      'Our source code is available and accessible on GitHub, you can read it, run it and inspect it to verify that our actions match with our promises.',
    icon: Code,
  },
];

export function Features(): JSX.Element {
  return (
    <ul tw="flex flex-col space-y-12 max-w-[500px] md:(flex-row justify-between space-x-6 space-y-0 max-w-full px-0)">
      {contents.map((item) => (
        <li tw="flex-1" key={item.heading}>
          <Feature {...item} />
        </li>
      ))}
    </ul>
  );
}

type FeatureProps = {
  heading: string;
  content: string;
  icon: Icon;
};
function Feature(props: FeatureProps): JSX.Element {
  const Icon = props.icon;
  return (
    <section>
      <div tw="bg-primary-300 inline-block p-3 rounded-full text-primary-1000 mb-4">
        <Icon size={26} />
      </div>
      <Heading as="h4" tw="font-semibold mb-3">
        {props.heading}
      </Heading>
      <Text variant="secondary">{props.content}</Text>
    </section>
  );
}
