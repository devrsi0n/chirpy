import { Heading } from '$/components/heading';
import { IconCode, IconFigma, IconLock, Icon } from '$/components/icons';
import { Text } from '$/components/text';

const contents: FeatureProps[] = [
  {
    heading: 'Easy customization',
    content:
      'You can customize widget styles to match your design system easily. ✨',
    icon: IconFigma,
  },
  {
    heading: 'Privacy at next level',
    content: `We never track you, sell your data or show Ads. We even built a custom telemetry system to avoid sharing your data with a third-party.`,
    icon: IconLock,
  },
  {
    heading: 'Open source',
    content:
      'Our source code is available and accessible on GitHub. You can read it, run it and inspect it to verify that our actions match with our promises.',
    icon: IconCode,
  },
];

export function Features(): JSX.Element {
  return (
    <ul className="grid gap-8 lg:grid-cols-2 lg:gap-10 2xl:grid-cols-3">
      {contents.map((item) => (
        <li className="" key={item.heading}>
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
    <section className="flex flex-row space-x-4 sm:flex-col sm:space-x-0">
      <div className="mb-4 inline-block h-fit w-fit rounded-full bg-primary-300 p-3 text-primary-1000">
        <Icon size={26} />
      </div>
      <div>
        <Heading as="h4" className="mb-3 font-semibold">
          {props.heading}
        </Heading>
        <Text variant="secondary" className="max-w-sm">
          {props.content}
        </Text>
      </div>
    </section>
  );
}
