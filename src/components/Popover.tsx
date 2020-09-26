/** @jsx jsx */
import { Box, jsx } from 'theme-ui';
import * as React from 'react';
import { darken } from '@theme-ui/color';

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
            top: ref.current?.getBoundingClientRect().height,
          }}
        >
          <div
            sx={{
              margin: '0 10px 0 auto',
              width: 0,
              height: 0,
              borderLeft: `8px solid transparent`,
              borderRight: `8px solid transparent`,
              borderBottom: (theme) =>
                `10px solid ${darken(theme.colors.background, 0.0175)(theme)}`,
            }}
          />
          <div
            sx={{
              p: 3,
              boxShadow: 's',
              borderRadius: 2,
              bg: 'background',
            }}
          >
            {props.content}
          </div>
        </div>
      )}
    </Box>
  );
}
