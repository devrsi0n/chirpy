import * as Collapsible from '@radix-ui/react-collapsible';
import clsx from 'clsx';
import { AnimatePresence, m, MotionProps } from 'framer-motion';
import * as React from 'react';

import { IconChevronDown, Link } from '../../../../components';
import { navItemStyle } from './nav-link';

export type CollapsibleNavProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
};

export function CollapsibleNav(props: CollapsibleNavProps): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
      <Collapsible.Trigger className={navItemStyle}>
        <div className="flex flex-1 items-center space-x-3">
          {props.trigger}
        </div>
        <IconChevronDown
          size={24}
          className={clsx('transition duration-150', isOpen && 'rotate-180')}
        />
      </Collapsible.Trigger>
      <Collapsible.Content forceMount>
        <AnimatePresence>
          {isOpen && (
            <m.div {...slideMotion} className="ml-9" key="collapsible-content">
              {props.children}
            </m.div>
          )}
        </AnimatePresence>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

CollapsibleNav.Item = SitesNavItem;

export type SitesNavItemProps = {
  href: string;
  children: React.ReactNode;
};

function SitesNavItem(props: SitesNavItemProps) {
  return (
    <Link href={props.href} variant="plain" className={navItemStyle}>
      {props.children}
    </Link>
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
