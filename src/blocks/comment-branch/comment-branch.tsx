import clsx from 'clsx';
import * as React from 'react';

import styles from './comment-branch.module.scss';

const defaultWidth = 1.2;
const defaultHeight = 3.2;
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
} & React.ComponentPropsWithoutRef<'li'>;

// https://codepen.io/rno1d/pen/VaaBxz
export function CommentBranch({
  width = defaultWidth,
  height = defaultHeight,
  hiddenBranch,
  className,
  ...restProps
}: CommentBranchProps): JSX.Element {
  return (
    <li
      {...restProps}
      className={clsx(
        `space-y-2`,

        !hiddenBranch && styles.commentBranch,
        className,
      )}
      style={
        {
          '--comment-branch-width': `${width}rem`,
          '--comment-branch-height': `${height}rem`,
        } as React.CSSProperties
      }
    />
  );
}
