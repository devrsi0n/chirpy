import * as Collapsible from '@radix-ui/react-collapsible';
import clsx from 'clsx';
import { AnimatePresence, m, MotionProps } from 'framer-motion';
import * as React from 'react';

import { IconChevronDown, Link } from '../../../../components';
import { navLinkStyle } from './nav-link';

export type CollapsibleNavProps = {
  children: React.ReactNode;
};

export function CollapsibleNav(props: CollapsibleNavProps): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);
  const childList = React.Children.toArray(props.children);
  const trigger = childList.find(
    (el) => (el as React.ReactElement).type === CollapsibleNavTrigger,
  );
  const content = childList.find(
    (el) => (el as React.ReactElement).type === CollapsibleNavContent,
  ) as React.ReactElement<
    CollapsibleNavContentProps,
    typeof CollapsibleNavContent
  >;
  return (
    <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
      {trigger}
      {content && React.cloneElement(content, { isOpen })}
    </Collapsible.Root>
  );
}

CollapsibleNav.Trigger = CollapsibleNavTrigger;
CollapsibleNav.Content = CollapsibleNavContent;
CollapsibleNav.Item = CollapsibleNavItem;

export type CollapsibleNavTriggerProps = Collapsible.CollapsibleTriggerProps;

function CollapsibleNavTrigger(props: CollapsibleNavTriggerProps) {
  return (
    <Collapsible.Trigger
      className={clsx(
        navLinkStyle,
        `[&>svg]:data-[state=open]:rotate-180`,
        props.className,
      )}
    >
      <div className="flex flex-1 items-center space-x-3">{props.children}</div>
      <IconChevronDown size={24} className={clsx('transition duration-150')} />
    </Collapsible.Trigger>
  );
}

export type CollapsibleNavContentProps = Collapsible.CollapsibleContentProps & {
  isOpen?: boolean;
};

function CollapsibleNavContent({
  isOpen,
  children,
  ...restProps
}: CollapsibleNavContentProps) {
  return (
    <Collapsible.Content forceMount {...restProps}>
      <AnimatePresence>
        {isOpen && (
          <m.ul {...slideMotion} className="ml-9" key="collapsible-content">
            {children}
          </m.ul>
        )}
      </AnimatePresence>
    </Collapsible.Content>
  );
}

export type CollapsibleNavItemProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

function CollapsibleNavItem(props: CollapsibleNavItemProps) {
  return (
    <li>
      <Link
        href={props.href}
        variant="plain"
        className={clsx(navLinkStyle, props.className)}
      >
        {props.children}
      </Link>
    </li>
  );
}

const slideMotion: MotionProps = {
  transition: {
    duration: 0.15,
  },
  initial: {
    opacity: 0,
    y: '-75%',
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: '-75%',
  },
};
