/** @jsx jsx */
import { Box, jsx } from 'theme-ui';
import * as React from 'react';

import { useClickOutside } from '../hooks/useOutside';

interface IPopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

export function Popover(props: IPopoverProps): JSX.Element {
  const ref: React.RefObject<HTMLDivElement> = React.useRef(null);
  const [hidePopup, setHidePopup] = React.useState(false);
  useClickOutside(ref, setHidePopup);
  const handleClick = React.useCallback(() => {
    setHidePopup(false);
  }, []);
  return (
    <Box
      ref={ref}
      onClick={handleClick}
      sx={{
        position: 'relative',
      }}
    >
      {props.children}
      {!hidePopup && (
        <div
          sx={{
            position: 'absolute',
            right: 0,
            top: ref.current?.getBoundingClientRect().height || 0 + 8,
            boxShadow: 's',
            borderRadius: 2,
          }}
        >
          <div
            sx={{
              position: 'absolute',
              top: '-8px',
              right: '8px',
              backgroundColor: 'background',
              boxShadow: 's',
              boxSizing: 'border-box',
              transform: 'rotate(45deg)',
              height: '16px',
              width: '16px',
            }}
          />
          <div
            sx={{
              py: 2,
              borderRadius: 2,
              bg: 'background',
              position: 'relative',
            }}
          >
            {props.content}
          </div>
        </div>
      )}
    </Box>
  );
}
