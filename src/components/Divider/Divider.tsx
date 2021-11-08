import * as React from 'react';
import tw, { css } from 'twin.macro';

export type DividerProps = React.ComponentPropsWithoutRef<'div'> & {
  vertical?: boolean;
};

export function Divider({ vertical, ...divProps }: DividerProps): JSX.Element {
  if (vertical) {
    return <div role="separator" {...divProps} tw="w-[1px]" css={bgStyle} />;
  }
  return (
    <div
      role="separator"
      css={[
        tw`w-auto max-w-full relative`,
        css`
          ${bgStyle};
          height: 1px;
          border-style: initial;

          &::after {
            border-style: initial;
          }

          @media only screen and (max-width: 600px) (-webkit-min-device-pixel-ratio: 2) and (min-resolution: 192dpi) {
            &:after {
              ${bgStyle};
              content: '';
              position: absolute;
              left: 0;
              width: 100%;
              height: 1px;
              transform: scaleY(0.5);
              transform-origin: 0 0;
            }
          }
        `,
      ]}
      {...divProps}
    />
  );
}

const bgStyle = tw`bg-gray-500`;
