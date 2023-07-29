import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

import Footer from '../components/footer';
import { TW } from '../components/tw';
import { LOGO_URL } from './constants';

export type Plan = 'Pro' | 'Enterprise';

export type UpgradePlanProps = {
  name: string;
  plan: Plan;
};

export const getSubject = (plan: Plan) =>
  `Thank you for upgrading to Chirpy ${plan}!`;

export function UpgradePlan({ name, plan }: UpgradePlanProps) {
  return (
    <Html>
      <Head />
      <Preview>{getSubject(plan)}</Preview>
      <TW>
        <Body className="text-grey-1200 mx-auto my-auto bg-white font-sans">
          <Container className="border-grey-400 mx-auto my-10 max-w-[500px] rounded-lg border border-solid px-10 py-5">
            <Section className="mt-8">
              <Img
                src={LOGO_URL}
                width="141"
                height="45"
                alt="Chirpy"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="text-grey-1200 mx-0 my-7 p-0 text-center font-sans text-xl font-semibold">
              Thank you for upgrading to Chirpy {plan}!
            </Heading>
            <Text className="text-grey-1200 text-sm leading-6">
              Hi{name && ` ${name}`}!
            </Text>
            <Text className="text-grey-1200 text-sm leading-6">
              My name is Qing, and I am thrilled to connect with you as the
              founder of Chirpy. Firstly, I wanted to express my heartfelt
              gratitude for choosing to upgrade to Chirpy {plan}!
            </Text>
            <Text className="text-grey-1200 text-sm leading-6">
              At Chirpy, we take immense pride in being a 100%{' '}
              <Link
                href="https://github.com/devrsi0n/chirpy"
                className="font-medium text-violet-900 no-underline"
              >
                open-source
              </Link>{' '}
              business. Your decision to support us truly means the world and
              fuels our ongoing efforts to enhance and expand Chirpy.
            </Text>
            <Text className="text-grey-1200 text-sm leading-6">
              On the {plan} plan, you now have access to:
            </Text>
            <Text className="text-grey-1200 ml-1 text-sm leading-4">
              ✅ 10K pageviews included
            </Text>
            <Text className="text-grey-1200 ml-1 text-sm leading-4">
              ✅ $5 / month for every additional 10K pageviews
            </Text>
            <Text className="text-grey-1200 ml-1 text-sm leading-4">
              ✅ Paste local images
            </Text>
            <Text className="text-grey-1200 ml-1 text-sm leading-4">
              ✅ No branding
            </Text>
            <Text className="text-grey-1200 ml-1 text-sm leading-4">
              ✅ Priority support
            </Text>
            <Text className="text-grey-1200 text-sm leading-6">
              Please feel free to reach out if you have any questions,
              suggestions, or feedback. We are always eager to hear from our
              valued users like you.
            </Text>
            <Container>
              <Text className="text-grey-1100 m-0 text-sm leading-6">
                Best,
              </Text>
              <Text className="text-grey-1100 m-0 text-sm leading-6">
                Qing from Chirpy
              </Text>
            </Container>
            <Footer />
          </Container>
        </Body>
      </TW>
    </Html>
  );
}

export default function UpgradePlanDemo() {
  return <UpgradePlan name="Jimmy" plan="Pro" />;
}
