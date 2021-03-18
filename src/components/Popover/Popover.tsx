import * as React from 'react';

import { useClickOutside } from '../../hooks/useOutside';

interface IPopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

export function Popover(props: IPopoverProps): JSX.Element {
  const ref: React.RefObject<HTMLDivElement> = React.useRef(null);
  const [hidePopup, setHidePopup] = React.useState(true);
  useClickOutside(ref, setHidePopup);
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => {
      setHidePopup(false);
      event.preventDefault();
    },
    [],
  );
  return (
    <div
      ref={ref}
      onClick={handleClick}
      onKeyPress={handleClick}
      tw="relative focus:outline-none"
      role="button"
      tabIndex={0}
    >
      {props.children}
      {!hidePopup && (
        <div
          tw="absolute right-0 rounded-sm shadow"
          style={{
            top: (ref.current?.getBoundingClientRect().height || 0) + 8,
          }}
        >
          <div
            tw="absolute h-4 w-4 transform rotate-45 shadow bg-white dark:bg-black"
            style={{
              top: '-8px',
              right: '8px',
            }}
          />
          <div tw="relative py-2 rounded-sm bg-white dark:bg-black">{props.content}</div>
        </div>
      )}
    </div>
  );
}
