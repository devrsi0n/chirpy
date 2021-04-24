import { ClassNames } from '@emotion/react';
import { Popover as HeadLessPopover, Transition } from '@headlessui/react';
import * as React from 'react';
import 'twin.macro';
import tw from 'twin.macro';

import { Button, ButtonProps } from '../Button';

interface IPopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  buttonProps: Partial<ButtonProps>;
}

export function Popover(props: IPopoverProps): JSX.Element {
  const ref: React.RefObject<HTMLButtonElement> = React.useRef(null);

  return (
    <HeadLessPopover tw="relative">
      {({ open }) => (
        <>
          <HeadLessPopover.Button {...props.buttonProps} as={Button} ref={ref}>
            {props.children}
          </HeadLessPopover.Button>
          <ClassNames>
            {({ css }) => (
              <Transition
                show={open}
                enter={css(tw`transition duration-100 ease-out`)}
                enterFrom={css(tw`transform opacity-0`)}
                enterTo={css(tw`transform opacity-100`)}
                leave={css(tw`transition ease-out`)}
                leaveFrom={css(tw`transform opacity-100`)}
                leaveTo={css(tw`transform opacity-0`)}
              >
                <HeadLessPopover.Panel
                  static
                  tw="absolute right-0 z-10 border bg-white dark:bg-black rounded"
                  style={{
                    bottom: (ref.current?.getBoundingClientRect().height || 40) + 16,
                  }}
                >
                  <div
                    tw="absolute h-4 w-4 transform rotate-45 border bg-white dark:bg-black"
                    style={{
                      bottom: '-8px',
                      right: `${(ref.current?.getBoundingClientRect().height || 16) / 2}px`,
                    }}
                  />
                  <div tw="relative py-2 px-4 bg-white dark:bg-black">{props.content}</div>
                </HeadLessPopover.Panel>
              </Transition>
            )}
          </ClassNames>
        </>
      )}
    </HeadLessPopover>
  );
}
