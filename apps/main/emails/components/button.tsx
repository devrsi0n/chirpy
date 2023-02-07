import cx from 'classnames';
import { MjmlButton } from 'mjml-react';
import React from 'react';

import {
  colors,
  fontSize,
  borderRadius,
  lineHeight,
  fontWeight,
} from '../theme';

type ButtonProps = React.ComponentProps<typeof MjmlButton>;

export default function Button(props: ButtonProps) {
  return (
    <MjmlButton
      lineHeight={lineHeight.tight}
      fontSize={fontSize.base}
      fontWeight={fontWeight.bold}
      innerPadding="10px 16px"
      align="left"
      backgroundColor={colors.primary[900]}
      color={colors.primary[100]}
      borderRadius={borderRadius.sm}
      cssClass={cx('button', props.cssClass)}
      {...props}
    />
  );
}
