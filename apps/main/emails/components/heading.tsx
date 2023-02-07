import React from 'react';

import { fontFamily, lineHeight, fontWeight, fontSize } from '../theme';
import Text from './text';

type HeadingProps = React.ComponentProps<typeof Text>;

const defaultProps = {
  fontFamily: fontFamily.sans,
  fontWeight: fontWeight.semibold,
  lineHeight: lineHeight.tight,
  fontSize: fontSize.lg,
};

export default function Heading(props: HeadingProps) {
  return (
    <Text {...defaultProps} {...props}>
      {props.children}
    </Text>
  );
}
