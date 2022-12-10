import {
  IconChrome,
  IconCloud,
  IconCornerLeftDown,
  IconCreditCard,
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
      'Yes, our free plan is designed to give you a taste of what our service has to offer. Sign up for a free account and experience the value of our platform for yourself.',
    icon: <IconHeart />,
  },
  {
    title: 'Can I change my plan later?',
    description:
      // Alternate: Yes, you can upgrade or downgrade your plan as needed. Simply contact our support team to discuss your options and find the right plan for your current and future needs
      'Yes, you can easily change your plan at any time. Our flexible pricing options allow you to scale your usage as your company grows, and our friendly team is here to help you find the right solution for your needs.',
    icon: <IconRepeat />,
  },
  {
    title: `What's your refund policy?`,
    description: `Our refund policy is simple and straightforward. If you need to cancel your plan, you can do so at any time, 
      and we'll refund you for any unused time on your plan. Just contact our support team to request a refund and we'll take care of the rest.`,
    icon: <IconCornerLeftDown />,
  },
  {
    title: `What browsers do you support?`,
    description: (
      <span>
        Chirpy is built to work with the most recent versions of Chrome, Firefox, Safari, and Edge. If you're using one of these browsers, you can expect a seamless and enjoyable experience with Chirpy. 
        <br />
        <span>{`We don't support Internet Explorer, so if you're using that browser, you may experience some compatibility issues.`}</span>
      </span>
    ),
    icon: <IconChrome />,
  },
  {
    title: `What payment methods do you support?`,
    description: (
      <span>
        Our payment is provided by{' '}
        <Link href="https://www.paddle.com/">Paddle</Link>, a secure and reliable payment platform that supports all major credit and debit cards, 
        as well as popular digital payment options like PayPal, Google Pay, and Apple Pay. 
        With Paddle, you can be confident that your payment information is safe and that you'll have a smooth and hassle-free checkout experience.{' '}
        <Link href="https://www.paddle.com/help/start/intro-to-paddle/which-payment-methods-do-you-support">
          More details
        </Link>
      </span>
    ),
    icon: <IconCreditCard />,
  },
  {
    title: `Is self-hosted supported for Chirpy?`,
    description: (
      <span>
        {`Yes, it is. Chirpy is available in both cloud and self-hosted versions. The self-hosted version offers the same features and capabilities as the cloud version, but with the added benefit of being able to host it on your own servers. This allows you to have complete control over your data, security, and configuration, and to tailor Chirpy to your unique business needs.`}
        <Link href="https://chirpy.dev/docs/self-hosted">More details</Link>
      </span>
    ),
    icon: <IconCloud />,
  },
];
