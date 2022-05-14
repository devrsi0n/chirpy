import clsx from 'clsx';
import { m, MotionProps } from 'framer-motion';
import * as React from 'react';

import styles from './comment-branch.module.scss';

const DEFAULT_WIDTH = 1.2;
const DEFAULT_HEIGHT = 3.2;

export type CommentBranchProps = {
  hiddenBranch?: boolean;
  /**
   * rem
   */
  width?: number;
  /**
   * rem
   */
  height?: number;
} & React.ComponentPropsWithoutRef<'li'> &
  MotionProps;

// https://codepen.io/rno1d/pen/VaaBxz
export function CommentBranch({
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  hiddenBranch,
  className,
  ...restProps
}: CommentBranchProps): JSX.Element {
  return (
    <m.li
      {...restProps}
      className={clsx(`space-y-2`, !hiddenBranch && styles.commentBranch, className)}
      style={
        {
          '--comment-branch-width': `${width}rem`,
          '--comment-branch-height': `${height}rem`,
        } as React.CSSProperties
      }
    />
  );
}
