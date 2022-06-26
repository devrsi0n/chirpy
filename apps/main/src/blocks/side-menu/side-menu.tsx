import clsx from 'clsx';
import { m, useCycle, Variants } from 'framer-motion';
import * as React from 'react';

import { IconButton } from '$/components/button';
import { IconMenu, IconX } from '$/components/icons';
import { useClickOutside } from '$/hooks/use-click-outside';
import useIsomorphicLayoutEffect from '$/hooks/use-isomorphic-layout-effect';
import { isSSRMode } from '$/utilities/env';

import {
  SideMenuContextProvider,
  useSideMenuContext,
} from './side-menu-context';

export type SideMenuProps = {
  position?: 'tl' | 'br';
  styles?: {
    items?: string;
  };
  children: React.ReactNode;
  fixed?: boolean;
};

const circlePosStyle = {
  tl: '30px 32px',
  br: `calc(100% - 30px) calc(100% - 30px)`,
};

const navVariants: Variants = {
  open: {
    zIndex: 21,
  },
  closed: {
    transitionEnd: {
      zIndex: 0,
    },
  },
};

/**
 * SideMenu is a toggle menu on mobile views.
 */
export function SideMenu({
  children,
  position = 'tl',
  styles,
  fixed,
}: SideMenuProps): JSX.Element {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useClickOutside(() => isOpen && toggleOpen(0));
  const [containerStyles, buttonStyles] = posStyles[position];
  const backgroundVariant = React.useMemo(() => {
    const pos = circlePosStyle[position];
    return {
      open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at ${pos})`,
        transition: {
          type: 'spring',
          stiffness: 20,
          restDelta: 2,
        },
      }),
      closed: {
        clipPath: `circle(18px at ${pos})`,
        transition: {
          delay: 0.5,
          type: 'spring',
          stiffness: 400,
          damping: 40,
        },
      },
    };
  }, [position]);
  const [isAnimationEnd, setIsAnimationEnd] = React.useState(true);

  useIsomorphicLayoutEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('overflow');
    }
  }, [isOpen]);

  return (
    <m.nav
      initial={false}
      variants={navVariants}
      animate={isOpen ? 'open' : 'closed'}
      custom={!isSSRMode ? document.body.clientHeight : undefined}
      className={clsx(
        'top-0 bottom-0 isolate h-[100vh] w-[250px]',
        containerStyles,
        isAnimationEnd && `h-auto`,
        fixed ? `fixed` : `absolute sm:fixed`,
      )}
      ref={containerRef}
      onAnimationStart={(definition) =>
        definition === 'open' && setIsAnimationEnd(false)
      }
      onAnimationComplete={(definition) =>
        definition === 'closed' && setIsAnimationEnd(true)
      }
    >
      <m.div
        className={clsx(
          'absolute inset-0 bg-gray-200',
          isAnimationEnd && `!hidden`,
        )}
        variants={backgroundVariant}
      />
      <SideMenuContextProvider onClickMenuItem={() => toggleOpen(0)}>
        <SideMenuItems className={styles?.items}>{children}</SideMenuItems>
      </SideMenuContextProvider>
      <IconButton
        aria-expanded={isOpen}
        onClick={() => toggleOpen()}
        className={clsx('bg-gray-100', buttonStyles)}
      >
        <span className="sr-only">Open navigation menu</span>
        <IconMenu className={clsx(isOpen && `hidden`)} />
        <IconX className={clsx(!isOpen && `hidden`)} />
      </IconButton>
    </m.nav>
  );
}

SideMenu.Item = SideMenuItem;

const posStyles = {
  tl: [`left-0`, `!absolute top-[18px] left-[18px]`],
  br: [`right-0`, `!fixed bottom-[18px] right-[18px]`],
};

type SideMenuItemsProps = {
  children: React.ReactNode;
  className?: string;
};

const itemsVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

function SideMenuItems({
  children,
  className,
}: SideMenuItemsProps): JSX.Element {
  return (
    <m.ul
      className={clsx('absolute top-[75px] flex flex-col space-y-4', className)}
      variants={itemsVariants}
    >
      {children}
    </m.ul>
  );
}

const itemVariants = {
  open: {
    display: 'block',
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    display: 'block',
    y: 50,
    opacity: 0,
    transitionEnd: {
      display: 'none',
    },
    transition: {
      y: { stiffness: 1000 },
    },
  },
};
export type SideMenuItemProps = {
  children: React.ReactNode;
};

function SideMenuItem({ children }: SideMenuItemProps): JSX.Element {
  const { onClickMenuItem } = useSideMenuContext();
  return (
    <m.li variants={itemVariants} onClick={onClickMenuItem}>
      {children}
    </m.li>
  );
}
