import * as React from 'react';
import tw, { css } from 'twin.macro';

export type DividerProps = React.ComponentPropsWithoutRef<'div'>;

export function Divider({ className, style, ...divProps }: DividerProps): JSX.Element {
  return (
    <>
      <div
        role="separator"
        className={className}
        css={[
          tw`w-auto max-w-full relative`,
          css`
            ${bgStyle};
            height: 1px;
            border-style: initial;

            &::after {
              border-style: initial;
            }

            .dark & {
              ${tw`bg-gray-700`}
            }

            @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
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

              .dark {
                &:after {
                  ${tw`bg-gray-700`};
                }
              }
            }
          `,
        ]}
        style={style}
        {...divProps}
      />
    </>
  );
}

const bgStyle = tw`bg-gray-100`;
