import { useButton } from '@react-aria/button';
import { AriaButtonProps } from '@react-types/button';
import clsx from 'clsx';
import * as React from 'react';

export type BaseButtonProps = AriaButtonProps &
  Omit<React.ComponentPropsWithRef<'button'>, keyof AriaButtonProps>;

const BaseButton = React.forwardRef(function BaseButton(
  { type = 'button', children, className, onClick, onMouseDown, ...restProps }: BaseButtonProps,
  ref: React.Ref<HTMLButtonElement>,
): JSX.Element {
  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      // Prevent mouse click with focus styles(e.g. outline)
      e.preventDefault();
      onMouseDown?.(e);
    },
    [onMouseDown],
  );
  const defaultRef = React.useRef<HTMLButtonElement>();
  const _ref: React.RefObject<HTMLButtonElement> = (ref ||
    defaultRef) as React.RefObject<HTMLButtonElement>;
  const props = {
    type,
    ...restProps,
  };
  const { buttonProps } = useButton(props, _ref);
  const allProps = {
    ...buttonProps,
    ...restProps,
  };

  return (
    <button
      {...allProps}
      className={clsx(
        'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-current disabled:opacity-75 disabled:cursor-not-allowed relative overflow-hidden inline-flex flex-row justify-center items-center select-none transition duration-150 ease-in-out',
        className,
      )}
      onMouseDown={handleMouseDown}
      onClick={onClick}
      ref={_ref}
    >
      {children}
    </button>
  );
});

export { BaseButton };
