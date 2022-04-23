import clsx from 'clsx';

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

        !hiddenBranch && 'relative before:-translate-y-2 before:border-l before:border-gray-500 after:-translate-y-2 after:border-l after:border-gray-500',
        className,
      )}
    />
  );
}
// .commentBranch {
//   position: relative;

//             &:before,
//             &:after {
//               transform: translateY(-0.5rem);
//               border-left-width: 1px;
//               @apply border-gray-500;
//             }

//             &:before {
//               position: absolute;
//               top: 0;
//               left: -${width}rem;
//               display: block;
//               width: ${width}rem;
//               height: ${height}rem;
//               content: '';
//               border-bottom-width: 1px;
//               border-bottom-left-radius: 8px;
//             }

//             &:after {
//               position: absolute;
//               top: ${height - 0.3}rem;
//               bottom: -0.5rem;
//               left: -${width}rem;
//               display: block;
//               content: '';
//             }

//             &:last-child:after {
//               display: none;
//             }
// }
