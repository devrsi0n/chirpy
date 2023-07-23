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
import { LOGO_URL } from './constants';
import { TW } from '../components/tw';

export type UpgradePlan = {
  name: string;
  email: string;
  plan: 'Pro' | 'Enterprise';
};

export function UpgradePlan({ name, email, plan }: UpgradePlan) {
  return (
    <Html>
      <Head />
      <Preview>Thank you for upgrading to Chirpy {plan}!</Preview>
      <TW>
        <Body className="mx-auto my-auto bg-white font-sans text-grey-1200">
          <Container className="mx-auto my-10 max-w-[500px] rounded-lg border border-solid border-grey-400 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={LOGO_URL}
                width="141"
                height="45"
                alt="Chirpy"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-grey-1200 font-sans">
              Thank you for upgrading to Chirpy {plan}!
            </Heading>
            <Text className="text-sm leading-6 text-grey-1200">
              Hi{name && ` ${name}`}!
            </Text>
            <Text className="text-sm leading-6 text-grey-1200">
              My name is Qing, and I am thrilled to connect with you as the
              founder of Chirpy. Firstly, I wanted to express my heartfelt
              gratitude for choosing to upgrade to Chirpy {plan}!
            </Text>
            <Text className="text-sm leading-6 text-grey-1200">
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
            <Text className="text-sm leading-6 text-grey-1200">
              On the {plan} plan, you now have access to:
            </Text>
            <Text className="ml-1 text-sm leading-4 text-grey-1200">
              ✅ 10K pageviews included
            </Text>
            <Text className="ml-1 text-sm leading-4 text-grey-1200">
              ✅ $5 / month for every additional 10K pageviews
            </Text>
            <Text className="ml-1 text-sm leading-4 text-grey-1200">
              ✅ Paste local images
            </Text>
            <Text className="ml-1 text-sm leading-4 text-grey-1200">
              ✅ No branding
            </Text>
            <Text className="ml-1 text-sm leading-4 text-grey-1200">
              ✅ Priority support
            </Text>
            <Text className="text-sm leading-6 text-grey-1200">
              Please feel free to reach out if you have any questions, suggestions, or feedback. We are always eager to hear from our valued users like you.
            </Text>
            <Container>
              <Text className="text-sm leading-6 text-grey-1100 m-0">
                Best,
              </Text>
              <Text className="text-sm leading-6 text-grey-1100 m-0">
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
  return <UpgradePlan name="Jimmy" email="jimmy@example.com" plan="Pro" />;
}
