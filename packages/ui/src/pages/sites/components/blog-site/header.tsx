import * as Collapsible from '@radix-ui/react-collapsible';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import * as React from 'react';

import { headerBlurBackgroundStyles, CommandMenu } from '../../../../blocks';
import {
  IconFeather,
  IconLink2,
  IconMenu,
  IconX,
  Image,
  Link,
} from '../../../../components';
import { useFrozeBodyScroll } from '../../../../hooks';
import { bluredBg } from '../../../../styles/common';
import { trpcClient } from '../../../../utilities';
import { xAxisStyles } from './styles';
import { LinkMeta, LogoMeta } from './types';

export type BlogHeaderProps = {
  links: LinkMeta[];
  logo: LogoMeta;
};

export function BlogHeader(props: BlogHeaderProps): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);
  useFrozeBodyScroll(isOpen);
  const logo = <Image {...props.logo} alt="Site logo" />;
  const { isFetching, data: posts } = trpcClient.command.searchBlog.useQuery();
  return (
    <>
      <header
        className={clsx(
          `z-20 hidden w-full sm:sticky sm:top-0 sm:left-0 sm:block`,
        )}
      >
        <div
          className={clsx(
            'border-b border-b-gray-300 py-4',
            xAxisStyles.parent,
            headerBlurBackgroundStyles,
          )}
        >
          <section
            className={clsx(
              'flex items-center justify-between',
              xAxisStyles.child,
            )}
          >
            <div className="flex items-center space-x-10">
              {logo}
              <nav className="flex gap-8 font-semibold">
                {props.links.map((link) => (
                  <Link key={link.name} href={link.href}>
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex">
              <CommandMenu>
                <CommandMenu.Group heading="Links">
                  {props.links.map((link) => (
                    <CommandMenu.Item href={link.href} key={link.href}>
                      <IconLink2 size={20} />
                      <span>{link.name}</span>
                    </CommandMenu.Item>
                  ))}
                </CommandMenu.Group>
                <CommandMenu.Separator />
                {isFetching && (
                  <CommandMenu.Loading>Loading posts</CommandMenu.Loading>
                )}
                <CommandMenu.Group heading="Posts">
                  {posts?.map((post) => (
                    <CommandMenu.Item
                      key={post.id}
                      href={`/post/${post.slug}`}
                      value={`${post.title} ${post.slug}`}
                    >
                      <span>
                        <IconFeather size={20} />
                      </span>
                      <span className="line-clamp-1">{post.title}</span>
                    </CommandMenu.Item>
                  ))}
                </CommandMenu.Group>
              </CommandMenu>
            </div>
          </section>
        </div>
      </header>
      <Collapsible.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        className={clsx(isOpen && 'h-full', 'block sm:hidden')}
      >
        <header className="flex w-full border-b p-4">
          <div className="flex w-full items-center justify-between">
            {logo}
            <Collapsible.Trigger>
              {isOpen ? <IconX /> : <IconMenu />}
            </Collapsible.Trigger>
          </div>
        </header>
        <Collapsible.Content className={clsx('relative w-full')} forceMount>
          <AnimatePresence>
            {isOpen && (
              <section
                className={clsx(
                  bluredBg,
                  'absolute left-0 top-0 w-full shadow-lg',
                )}
              >
                <nav
                  className={clsx(
                    'flex flex-col gap-2 border-b font-semibold',
                    mobileSectionStyles,
                  )}
                >
                  {props.links.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="py-3 px-4"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                {/* Act as padding bottom to fix bluredBg doesn't work */}
                <div className="h-16" />
              </section>
            )}
          </AnimatePresence>
        </Collapsible.Content>
      </Collapsible.Root>
    </>
  );
}

const mobileSectionStyles = `py-6`;
