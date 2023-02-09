import { EMAIL_PREFERENCES_URL } from 'mailing-core';
import { MjmlSection, MjmlWrapper, MjmlColumn, MjmlText } from 'mjml-react';
import React from 'react';

import { colors, fontSize, fontWeight } from '../theme';
import Link from './link';

type FooterProps = {
  includeUnsubscribe?: boolean;
};

export default function Footer({ includeUnsubscribe = true }: FooterProps) {
  return (
    <MjmlWrapper paddingTop={32}>
      <MjmlSection
        borderTop={`1px solid ${colors.gray[700]}`}
        paddingTop={32}
        paddingBottom={24}
      >
        <MjmlColumn>
          <MjmlText
            align="left"
            fontSize={fontSize.xs}
            fontWeight={fontWeight.bold}
          >
            {`Copyright © ${new Date().getFullYear()} Chirpy`}
            {includeUnsubscribe && (
              <>
                {` - `}
                <Link
                  color={colors.gray[900]}
                  href={EMAIL_PREFERENCES_URL}
                  textDecoration="none"
                  fontSize="font-weight: normal"
                >
                  Unsubscribe
                </Link>
              </>
            )}
          </MjmlText>
        </MjmlColumn>
      </MjmlSection>
    </MjmlWrapper>
  );
}
