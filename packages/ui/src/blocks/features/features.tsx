import { Heading } from '../../components/heading';
import { IconCode, IconFigma, IconLock, Icon } from '../../components/icons';
import { Link } from '../../components/link';
import { Text } from '../../components/text';

const contents: FeatureProps[] = [
  {
    heading: 'Easy customization',
    content:
      'With our easy-to-use customization options, you can match the widget styles to your design system with just a few clicks.✨',
    icon: IconFigma,
  },
  {
    heading: 'Privacy at next level',
    content: (
      <>
        <span>
        Sign in quickly and easily with minimal info. Choose from anonymous, email/magic link, or social login options. We respect your privacy and never track or sell your data. Learn more about our privacy policy.
        </span>
        <Link className="ml-1" href="/docs/features/privacy-friendly">
          privacy.
        </Link>
      </>
    ),
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
    <ul className="grid gap-8 lg:grid-cols-2 lg:gap-10">
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
  content: React.ReactNode;
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
