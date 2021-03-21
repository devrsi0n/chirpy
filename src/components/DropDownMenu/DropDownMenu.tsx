import { ClassNames } from '@emotion/react';
import ChevronDown from '@geist-ui/react-icons/chevronDown';
import { Menu, Transition } from '@headlessui/react';
import * as React from 'react';
import tw, { TwStyle } from 'twin.macro';

import { Button, IconButton } from '../Button';

export type Shape = 'circle' | 'square';

export type DropDownMenuProps = React.PropsWithChildren<{
  content: React.ReactNode;
  shape?: Shape;
  classes?: {
    root?: TwStyle;
    button?: TwStyle;
    items?: TwStyle;
  };
}>;

export function DropDownMenu({
  content,
  shape = 'circle',
  classes,
  children,
}: DropDownMenuProps): JSX.Element {
  return (
    <div css={[tw`relative inline-block text-left`, classes?.root]}>
      <Menu>
        {({ open }: { open: boolean }) => (
          <>
            <div css={classes?.button}>
              <Menu.Button as={shape === 'circle' ? IconButton : Button}>
                <span>{content}</span>
                {shape === 'square' && (
                  <ChevronDown css={[tw`w-5 h-5 ml-2 -mr-1 transform`, open && tw`rotate-180`]} />
                )}
              </Menu.Button>
            </div>
            <ClassNames>
              {({ css }) => (
                <Transition
                  show={open}
                  enter={css(tw`transition ease-out duration-100`)}
                  enterFrom={css(tw`transform opacity-0 scale-95`)}
                  enterTo={css(tw`transform opacity-100 scale-100`)}
                  leave={css(tw`transition ease-in duration-75`)}
                  leaveFrom={css(tw`transform opacity-100 scale-100`)}
                  leaveTo={css(tw`transform opacity-0 scale-95`)}
                >
                  <Menu.Items
                    static
                    css={[
                      tw`absolute right-0 mt-1 bg-white origin-top-right border border-gray-200 dark:(border-gray-700 bg-black) divide-y divide-gray-100 rounded-md shadow-lg outline-none space-y-1 py-1 z-30`,
                      classes?.items,
                    ]}
                  >
                    {children}
                  </Menu.Items>
                </Transition>
              )}
            </ClassNames>
          </>
        )}
      </Menu>
    </div>
  );
}

DropDownMenu.Item = DropDownMenuItem;

export type DropDownMenuItemProps = React.PropsWithChildren<{
  className?: string;
  onClick?(): void;
}>;

export function DropDownMenuItem(props: DropDownMenuItemProps): JSX.Element {
  const child = (/* { active }: ItemRenderPropArg */) => (
    <div css={itemStyle} className={props.className}>
      {props.children}
    </div>
  );
  return <Menu.Item onClick={props.onClick}>{child}</Menu.Item>;
}

const itemStyle = tw`flex flex-row items-center border-none text-gray-600 dark:text-gray-300 hover:(bg-gray-100 text-gray-700) dark:hover:(text-gray-100 bg-gray-800) cursor-pointer w-full px-6 py-2 text-sm text-right`;

// interface ItemRenderPropArg {
//   active: boolean;
//   disabled: boolean;
// }
