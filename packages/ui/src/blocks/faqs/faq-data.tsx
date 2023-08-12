import {
  IconChrome,
  IconCornerLeftDown,
  IconCreditCard,
  IconEye,
  IconHeart,
  IconRepeat,
  Link,
} from '../../components';

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
      'Of course. Our pricing scales with your business, you can upgrade or downgrade your plan at any time.',
    icon: <IconRepeat />,
  },
  {
    title: `What's your refund policy?`,
    description: `We understand that things change. You can cancel your paid plan at any time and we'll refund you the difference already paid. No questions asked.`,
    icon: <IconCornerLeftDown />,
  },
  {
    title: `Do pageviews count for all projects?`,
    description: `Yes, all pageviews from your projects are included in your account's usage. You only need to pay once if you require more pageviews.`,
    icon: <IconEye />,
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
        <Link href="https://stripe.com/">Stripe</Link>. We accept all major
        credit, debit cards, PayPal, Google Pay, and Apple Pay.{' '}
        <Link href="https://stripe.com/docs/payments/payment-methods/overview">
          More details
        </Link>
      </span>
    ),
    icon: <IconCreditCard />,
  },
];
