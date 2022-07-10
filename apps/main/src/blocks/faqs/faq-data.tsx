import {
  IconChrome,
  IconCloud,
  IconCornerLeftDown,
  IconCreditCard,
  IconHeart,
  IconRepeat,
} from '$/components/icons';
import { Link } from '$/components/link';

type FAQItem = {
  title: string;
  description: React.ReactNode;
  icon: JSX.Element;
};

export const FAQ_LIST: FAQItem[] = [
  {
    title: 'Is there a free plan available?',
    description:
      'Yes, we have a free plan for you. You can sign up for a free account and start using our service.',
    icon: <IconHeart />,
  },
  {
    title: 'Can I change my plan later?',
    description:
      'Of course. Our pricing scales with your company. Chat to our friendly team to find a solution that works for you.',
    icon: <IconRepeat />,
  },
  {
    title: `What's your refund policy?`,
    description: `We understand that things change. You can cancel your plan at any time and we'll refund you the difference already paid.`,
    icon: <IconCornerLeftDown />,
  },
  {
    title: `What browsers do you support?`,
    description: (
      <span>
        Chirpy is designed to work in the modern, recent releases of all major
        browsers, including Chrome, Firefox, Safari, and Edge.
        <br />
        <span>{`We don't support Internet Explorer.`}</span>
      </span>
    ),
    icon: <IconChrome />,
  },
  {
    title: `What payment methods do you support?`,
    description: (
      <span>
        Our payment is provided by{' '}
        <Link href="https://www.paddle.com/">Paddle</Link>. We accept all major
        credit, debit cards, PayPal, Google Pay, and Apple Pay.{' '}
        <Link href="https://www.paddle.com/help/start/intro-to-paddle/which-payment-methods-do-you-support">
          More details
        </Link>
      </span>
    ),
    icon: <IconCreditCard />,
  },
  {
    title: `Can Chirpy be self-hosted?`,
    description: (
      <span>
        {`Yes, it is. It's exactly the same product as our Cloud solution, but you have to install, host and manage your own infrastructure while the Cloud version we manage everything for your ease and convenience. `}
        <Link href="https://chirpy.dev/docs/self-hosted">More details</Link>
      </span>
    ),
    icon: <IconCloud />,
  },
];
