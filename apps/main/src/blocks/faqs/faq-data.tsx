import { Chrome, CornerLeftDown, IconHeart, Repeat } from '$/components/icons';

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
    icon: <Repeat />,
  },
  {
    title: `What's your refund policy?`,
    description: `We understand that things change. You can cancel your plan at any time and we'll refund you the difference already paid.`,
    icon: <CornerLeftDown />,
  },
  {
    title: `What browsers do you support?`,
    description: (
      <span>
        Chirpy are designed to work in the latest, stable releases of all major
        browsers, including Chrome, Firefox, Safari, and Edge.
        <br />
        <span>{`We don't support Internet Explorer 11.`}</span>
      </span>
    ),
    icon: <Chrome />,
  },
];
