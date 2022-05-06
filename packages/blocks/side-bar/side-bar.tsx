import ChevronRight from '@geist-ui/react-icons/chevronRight';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';

import { Heading } from '@chirpy/components';
import { Link } from '@chirpy/components';
import { List } from '@chirpy/components';
import { Directory } from '$/server/types/file';
import { listHoverable } from '@chirpy/styles/common';

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
        <Heading as="h4" className="font-bold px-1 pb-4 text-gray-1100">
          {title}
        </Heading>
      )}
    </>
  );
  return (
    <div>
      <aside
        className={clsx(
          'w-full h-[calc(100vh-4rem)] hidden sm:flex flex-shrink-0 flex-col items-start sticky top-16 px-4 isolate overflow-y-auto md:w-64 md:pb-16',
          className,
        )}
      >
        {header}
        {hasValidDirectories && (
          <div className="w-full overflow-y-auto">
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
              <div className="flex flex-col items-stretch w-full">
                <DirectoryItem directory={dir} />
              </div>
            </SideMenu.Item>
          ))}
        </SideMenu>
      </aside>
    </div>
  );
}

function Directories({ directories }: Pick<SideBarProps, 'directories'>): JSX.Element {
  return (
    <List className="space-y-2 flex-1">
      {directories.map((dir) => (
        <List.Item key={getId(dir)} hideMarker className="flex flex-col items-stretch w-full">
          <DirectoryItem directory={dir} />
        </List.Item>
      ))}
    </List>
  );
}

function DirectoryItem({ directory: dir }: { directory: Directory }) {
  const router = useRouter();
  const [isOpened, setIsOpened] = React.useState(false);
  const isActive = isButtonActive(dir, router.asPath);
  const listMarker = dir.route ? (
    <span className="rounded-full inline-block w-1.5 h-1.5 mr-3.5 bg-current hover:bg-gray-1200" />
  ) : (
    <ChevronRight
      size={18}
      className={clsx(`transition -ml-1.5 mr-2`, isOpened && `rotate-90`)}
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
          className={clsx(`capitalize text-gray-1100`, clickableItemStyle, isActive && activeStyle)}
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

const clickableItemStyle = [`transition flex flex-row items-center justify-start`, listHoverable];
const activeStyle = `text-gray-1200 font-bold`;

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