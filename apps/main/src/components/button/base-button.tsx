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
        'relative inline-flex select-none flex-row items-center justify-center overflow-hidden transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-75',
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
