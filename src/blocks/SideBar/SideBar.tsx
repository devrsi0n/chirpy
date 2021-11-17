import ChevronRight from '@geist-ui/react-icons/chevronRight';
import { useRouter } from 'next/router';
import * as React from 'react';
import tw from 'twin.macro';

import { Heading } from '$/components/Heading';
import { Link } from '$/components/Link';
import { List } from '$/components/List';
import { Directory } from '$/server/types/file';
import { listHoverable } from '$/styles/common';

import { SideMenu } from '../SideMenu';

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
        <Heading as="h4" tw="font-bold px-1 pb-4 text-gray-1100">
          {title}
        </Heading>
      )}
    </>
  );
  return (
    <div>
      <aside
        tw="w-full height[calc(100vh - 4rem)] hidden sm:flex flex-shrink-0 flex-col items-end sticky top-16 px-4 isolate overflow-y-auto md:(w-64 pb-16)"
        className={className}
      >
        {header}
        {hasValidDirectories && (
          <div tw="w-full overflow-y-auto">
            <Directories directories={directories} />
          </div>
        )}
      </aside>
      <aside tw="w-full sm:(hidden)">
        <SideMenu
          direction="br"
          styles={{ items: tw`w-full overflow-y-auto space-y-2 flex-1 pl-6` }}
        >
          <SideMenu.Item>{header}</SideMenu.Item>
          {directories.map((dir) => (
            <SideMenu.Item key={getId(dir)}>
              <div tw="flex flex-col items-stretch w-full">
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
    <List tw="space-y-2 flex-1">
      {directories.map((dir) => (
        <List.Item key={getId(dir)} noMarker tw="flex flex-col items-stretch w-full">
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
    <span css={[tw`rounded-full inline-block w-1.5 h-1.5 mr-3.5 bg-current hover:bg-gray-1200`]} />
  ) : (
    <ChevronRight
      size={18}
      css={[tw`transform transition -ml-1.5 mr-2`, isOpened && tw`rotate-90`]}
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
          css={[clickableItemStyle, router.asPath === dir.route && activeStyle]}
          noUnderline
          variant="secondary"
          tw="capitalize"
        >
          {listMarker}
          <span>{dir.title}</span>
        </Link>
      ) : (
        <button
          css={[tw`capitalize text-gray-1100`, clickableItemStyle, isActive && activeStyle]}
          type="button"
          onClick={() => setIsOpened((prev) => !prev)}
          aria-label="Expand children routes"
        >
          {listMarker}
          <span>{dir.title}</span>
        </button>
      )}
      {dir.children && isOpened && (
        <div tw="flex flex-row items-stretch">
          <div tw="ml-0.5 w-3.5 border-l" />
          <Directories directories={dir.children} />
        </div>
      )}
    </>
  );
}

const clickableItemStyle = [tw`transition flex flex-row items-center justify-start`, listHoverable];
const activeStyle = tw`text-gray-1200 font-bold`;

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
