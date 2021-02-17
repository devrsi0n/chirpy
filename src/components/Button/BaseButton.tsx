import * as React from 'react';
import { useButton } from '@react-aria/button';
import { AriaButtonProps } from '@react-types/button';
import clsx from 'clsx';

export type BaseButtonProps = AriaButtonProps &
  Omit<React.ComponentPropsWithRef<'button'>, keyof AriaButtonProps>;

const BaseButton = React.forwardRef(function BaseButton(
  { type = 'button', children, className, onClick, ...restProps }: BaseButtonProps,
  ref: React.Ref<HTMLButtonElement>,
): JSX.Element {
  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      // Prevent mouse click with focus styles(e.g. outline)
      e.preventDefault();
    },
    [],
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
    ...restProps,
    ...buttonProps,
  };

  return (
    <button
      {...allProps}
      className={clsx(
        'relative overflow-hidden inline-flex flex-row justify-center items-center select-none outline-none transition duration-150 ease-in-out',
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
