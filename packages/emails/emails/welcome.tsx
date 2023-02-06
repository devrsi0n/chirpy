import { MjmlColumn, MjmlSection, MjmlSpacer, MjmlWrapper } from 'mjml-react';
import React from 'react';

import BaseLayout from './components/base-layout';
import Button from './components/button';
import Footer from './components/footer';
import Header from './components/header';
import Heading from './components/heading';
import Text from './components/text';
import { fontSize, spacing, fontFamily, screens } from './theme';

const welcomeStyle = `
  .h1 > * {
    font-size: 24px !important;
  }
  .h2 > * {
    font-size: ${fontSize.lg}px !important;
  }
  .p > * {
    font-size: ${fontSize.base}px !important;
  }

  @media (min-width:${screens.xs}) {
    .h1 > * {
      font-size: 32px !important;
    }
    .h2 > * {
      font-size: ${fontSize.xxl}px !important;
    }
    .p > * {
      font-size: ${fontSize.md}px !important;
    }
  }
`;

type WelcomeProps = {
  includeUnsubscribe?: boolean;
};

const Welcome = ({ includeUnsubscribe }: WelcomeProps) => {
  return (
    <BaseLayout width={600} style={welcomeStyle}>
      <Header />
      <MjmlWrapper>
        <MjmlSection paddingBottom={spacing.s11}>
          <MjmlColumn>
            <Heading maxWidth={420} cssClass="h1">
              Welcome to Chirpy
            </Heading>
          </MjmlColumn>
        </MjmlSection>
        <MjmlSection paddingBottom={spacing.s11}>
          <MjmlColumn>
            <Heading cssClass="h2" paddingBottom={spacing.s6}>
              This is the Preview Viewer
            </Heading>
            <Text
              cssClass="p"
              fontSize={fontSize.md}
              paddingBottom={spacing.s7}
            >
              It shows previews from{' '}
              <span className="code">emails/previews</span>. Keep it open while
              you build your emails and it’ll live reload as you develop. To see
              it in action with this preview, make a change to{' '}
              <span className="code">emails/previews/Welcome.tsx</span>. You can
              deploy your Mailing server to Vercel or Netlify to share the
              Preview Viewer with your team.
            </Text>

            <Button
              href="https://github.com/sofn-xyz/mailing-templates"
              align="left"
              cssClass="sm-hidden"
            >
              More Demo Templates{'  '}
              <span style={{ fontFamily: fontFamily.serif }}>&rarr;</span>
            </Button>
            <MjmlSpacer height={spacing.s3} cssClass="lg-hidden" />
            <Button
              href="https://github.com/sofn-xyz/mailing-templates"
              align="right"
              cssClass="lg-hidden"
            >
              More Demo Templates{'  '}
              <span style={{ fontFamily: fontFamily.serif }}>&rarr;</span>
            </Button>
          </MjmlColumn>
        </MjmlSection>
      </MjmlWrapper>
      <Footer includeUnsubscribe={includeUnsubscribe} />
    </BaseLayout>
  );
};

export default Welcome;
