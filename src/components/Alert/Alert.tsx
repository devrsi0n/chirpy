import X from '@geist-ui/react-icons/x';
import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

import { IconButton } from '../Button';

export type AlertType = 'warn';

export type AlertProps = React.PropsWithChildren<{
  type: AlertType;
}>;

export function Alert(props: AlertProps): JSX.Element {
  const [hidden, setHidden] = React.useState(false);

  return (
    <>
      {hidden ? (
        <div />
      ) : (
        <div
          className="group"
          css={[
            tw`flex flex-row justify-center items-center py-2 px-4 rounded space-x-2`,
            typeStyles[props.type],
          ]}
        >
          <p tw="text-base leading-tight pl-6 pr-2">{props.children}</p>
          <IconButton
            tw="invisible group-hover:(visible)"
            onClick={() => setHidden(true)}
            aria-label="Dismiss"
          >
            <X size={18} />
          </IconButton>
        </div>
      )}
    </>
  );
}

const typeStyles: Record<AlertType, TwStyle> = {
  warn: tw`bg-yellow-300 text-yellow-900`,
};
