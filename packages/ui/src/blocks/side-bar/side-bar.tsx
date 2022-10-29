import { Directory } from '@chirpy-dev/types';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';

import { Heading } from '../../components/heading';
import { IconChevronRight } from '../../components/icons';
import { Link } from '../../components/link';
import { List } from '../../components/list';
import { listHoverable } from '../../styles/common';
import { SideMenu } from '../side-menu';

export type SideBarProps = React.PropsWithChildren<{
  directories: Directory[];
  title?: string;
  className?: string;
}>;

/**
 * SideBar is used in mobile and desktop views.
 */
export function SideBar({ directories, title, className }: SideBarProps) {
  const hasValidDirectories = directories.length > 0;
  const header = (
    <>
      {title && hasValidDirectories && (
        <Heading as="h4" className="px-1 pb-4 font-semibold text-gray-1100">
          {title}
        </Heading>
      )}
    </>
  );
  return (
    <div>
      <aside
        className={clsx(
          'sticky top-16 isolate hidden h-[calc(100vh-4rem)] w-full flex-shrink-0 flex-col items-start border-r border-gray-500 pl-4 text-gray-1200 sm:flex md:w-64',
          className,
        )}
      >
        {header}
        {hasValidDirectories && (
          <div className="w-full overflow-y-auto pr-1">
            <Directories directories={directories} />
          </div>
        )}
      </aside>
      <aside className="w-full sm:hidden">
        <SideMenu
          position="br"
          styles={{ items: `w-full overflow-y-auto space-y-2 flex-1 pl-6` }}
          fixed
        >
          <SideMenu.Item>{header}</SideMenu.Item>
          {directories.map((dir) => (
            <SideMenu.Item key={getId(dir)}>
              <div className="flex w-full flex-col items-stretch">
                <DirectoryItem directory={dir} />
              </div>
            </SideMenu.Item>
          ))}
        </SideMenu>
      </aside>
    </div>
  );
}

function Directories({
  directories,
}: Pick<SideBarProps, 'directories'>): JSX.Element {
  return (
    <List className="flex-1 space-y-2">
      {directories.map((dir) => (
        <List.Item
          key={getId(dir)}
          hideMarker
          className="flex w-full flex-col items-stretch"
        >
          <DirectoryItem directory={dir} />
        </List.Item>
      ))}
    </List>
  );
}

function DirectoryItem({ directory: dir }: { directory: Directory }) {
  const router = useRouter();
  const [isOpened, setIsOpened] = React.useState(() =>
    isButtonActive(dir, router.asPath),
  );
  const listMarker = dir.route ? (
    <span className="mr-3.5 inline-block h-1.5 w-1.5 rounded-full bg-current hover:bg-gray-1200" />
  ) : (
    <IconChevronRight
      size={18}
      className={clsx(`-ml-1.5 mr-2 transition`, isOpened && `rotate-90`)}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpened((prev) => !prev);
      }}
    />
  );

  return (
    <>
      {dir.route ? (
        <Link
          href={dir.route}
          className={clsx(
            'capitalize',
            clickableItemStyle,
            router.asPath === dir.route && activeStyle,
          )}
          hideUnderline
          variant="secondary"
        >
          {listMarker}
          <span>{dir.title}</span>
        </Link>
      ) : (
        <button
          className={clsx(`capitalize`, clickableItemStyle)}
          type="button"
          onClick={() => setIsOpened((prev) => !prev)}
          aria-label="Expand children routes"
        >
          {listMarker}
          <span>{dir.title}</span>
        </button>
      )}
      {dir.children && isOpened && (
        <div className="flex flex-row items-stretch">
          <div className="ml-0.5 w-3.5 border-l" />
          <Directories directories={dir.children} />
        </div>
      )}
    </>
  );
}

const clickableItemStyle = [
  `flex flex-row items-center justify-start`,
  listHoverable,
];
const activeStyle = `bg-primary-500 border border-primary-700 text-primary-1100`;

function isButtonActive(dir: Directory, pathname: string) {
  if (dir.route === pathname) {
    return true;
  }
  if (dir.children) {
    for (const child of dir.children) {
      if (isButtonActive(child, pathname)) {
        return true;
      }
    }
    return false;
  }
  return false;
}

function getId(dir: Directory) {
  return dir.title + (dir.route || '');
}
