import { MjmlColumn, MjmlGroup, MjmlSection, MjmlWrapper } from 'mjml-react';
import React from 'react';

import { fontSize, fontWeight } from '../theme';
import Link from './link';
import Text from './text';

export default function Header() {
  return (
    <MjmlWrapper padding="40px 0 64px">
      <MjmlSection>
        <MjmlGroup>
          <MjmlColumn width="42%">
            <Text align="left">
              <Link
                fontSize={fontSize.xl}
                fontWeight={fontWeight.bold}
                href="https://mailing.run"
                textDecoration="none"
              >
                <img
                  width="100"
                  src={'https://chirpy.dev/images/logo.png'}
                  alt=""
                  style={{
                    verticalAlign: 'text-bottom',
                    paddingRight: 10,
                    paddingBottom: 2,
                  }}
                />
              </Link>
            </Text>
          </MjmlColumn>
        </MjmlGroup>
      </MjmlSection>
    </MjmlWrapper>
  );
}
