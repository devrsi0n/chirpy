import cx from 'classnames';
import { MjmlText } from 'mjml-react';
import React from 'react';

type TextProps = {
  maxWidth?: number;
} & React.ComponentProps<typeof MjmlText>;

export default function Text({ children, maxWidth, ...props }: TextProps) {
  return maxWidth ? (
    <MjmlText {...props} cssClass={cx('button', props.cssClass)}>
      <div style={{ maxWidth }}>{children}</div>
    </MjmlText>
  ) : (
    <MjmlText {...props} cssClass={cx('button', props.cssClass)}>
      {children}
    </MjmlText>
  );
}
