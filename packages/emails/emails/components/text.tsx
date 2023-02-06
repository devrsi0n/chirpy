import cx from 'classnames';
import { MjmlText } from 'mjml-react';
import React from 'react';

import { lineHeight } from '../theme';

type TextProps = {
  maxWidth?: number;
} & React.ComponentProps<typeof MjmlText>;

export default function Text({ children, maxWidth, ...props }: TextProps) {
  return maxWidth ? (
    <MjmlText
      lineHeight={lineHeight.relaxed}
      {...props}
      cssClass={cx('button', props.cssClass)}
    >
      <div style={{ maxWidth }}>{children}</div>
    </MjmlText>
  ) : (
    <MjmlText
      lineHeight={lineHeight.relaxed}
      {...props}
      cssClass={cx('button', props.cssClass)}
    >
      {children}
    </MjmlText>
  );
}
