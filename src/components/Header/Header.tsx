import LogOut from '@geist-ui/react-icons/logOut';
import Menu from '@geist-ui/react-icons/menu';
import Dismiss from '@geist-ui/react-icons/x';
import { useRouter } from 'next/router';
import * as React from 'react';
import tw, { css } from 'twin.macro';

import { Avatar } from '$/components/Avatar';
import { Button } from '$/components/Button';
import { SlashIcon } from '$/components/Icons/SlashIcon';
import { Link } from '$/components/Link';
import { Select } from '$/components/Select';
import { CurrentUserContextType } from '$/context/CurrentUserContext';
import { useCurrentUser } from '$/hooks/useCurrentUser';

import { IconButton } from '../Button';
import { DropDownMenu } from '../DropDownMenu';
import { SpinnerIcon } from '../Icons';
import { Logo } from '../Logo';

const SELECTED_PROJECT_ID = 'SELECTED_PROJECT_ID';
type Project = NonNullable<NonNullable<CurrentUserContextType['projects']>[number]>;

export function Header(): JSX.Element {
  const { projects, displayName, avatar, error, loading: signInLoading } = useCurrentUser();
  const [selectedProject, setSelectedProject] = React.useState<Project>();
  React.useEffect(() => {
    if (projects?.length && !selectedProject) {
      const lastSelectedProject = localStorage.getItem(SELECTED_PROJECT_ID);
      setSelectedProject(
        projects.find((project: Project) => project.id === lastSelectedProject) || projects[0],
      );
    }
  }, [projects, selectedProject]);
  const handleSelectProject = React.useCallback(
    (projectID: string) => {
      setSelectedProject(projects?.find((project: Project) => project.id === projectID));
      localStorage.setItem(SELECTED_PROJECT_ID, projectID);
    },
    [projects],
  );

  const [showMenu, setShowMenu] = React.useState(false);
  const handleClickMenu = React.useCallback(() => {
    setShowMenu((prev) => !prev);
  }, []);

  const router = useRouter();

  if (error) {
    console.error('Get current user error:', error);
  }
  return (
    <header
      css={css`
        backdrop-filter: blur(15px);
      `}
      tw="w-full py-5 transition duration-150 border-b sm:(sticky top-0 left-0 z-20) border-gray-300 dark:border-gray-700"
    >
      <div tw="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <section tw="flex flex-row items-center justify-between">
          <div tw="flex items-center sm:hidden pl-3">
            <IconButton size="sm" aria-expanded={false} onClick={handleClickMenu}>
              <span tw="sr-only">Open navigation menu</span>
              <Menu css={[showMenu && tw`hidden`]} />
              <Dismiss css={[!showMenu && tw`hidden`]} />
            </IconButton>
          </div>
          <div tw="flex flex-row sm:(items-stretch justify-start)">
            <div tw="flex flex-row items-center space-x-2">
              <Logo />
              {router.pathname === '/dashboard' && !!projects?.length && selectedProject && (
                <>
                  <SlashIcon tw="text-gray-400" />
                  <Select
                    value={selectedProject?.id}
                    name={selectedProject?.name}
                    onChange={handleSelectProject}
                    tw="w-32 sm:w-40"
                  >
                    {projects.map((project: Project) => (
                      <Select.Option key={project.id} value={project.id}>
                        {project.name}
                      </Select.Option>
                    ))}
                  </Select>
                </>
              )}
            </div>
            <nav tw="w-full hidden sm:(flex mb-0 pl-8 ml-8 border-l border-gray-200) flex-wrap items-center mb-5 space-x-5">
              <Link href="/" tw="" highlightMatch>
                Home
              </Link>
              <Link href="/doc" tw="" highlightMatch>
                Doc
              </Link>
              <Link href="/pricing" tw="" highlightMatch>
                Pricing
              </Link>
              <Link href="/blog" tw="" highlightMatch>
                Blog
              </Link>
            </nav>
          </div>
          <div tw="flex">
            {displayName ? (
              <DropDownMenu content={<Avatar src={avatar} alt={`The avatar of ${displayName}`} />}>
                <DropDownMenu.Item tw="justify-end space-x-2">
                  <Link
                    href="/api/auth/logout"
                    variant="plain"
                    tw="flex flex-row items-center space-x-1"
                  >
                    <LogOut size={14} />
                    <span>Logout</span>
                  </Link>
                </DropDownMenu.Item>
                {/* <Divider /> */}
              </DropDownMenu>
            ) : (
              <div tw="flex flex-row items-center space-x-2">
                <Link href="/sign-in" variant="plain" disableUnderline>
                  <Button color="gray" variant="plain" tw="space-x-1">
                    {signInLoading && <SpinnerIcon tw="text-gray-400" />}
                    <span>Sign in</span>
                  </Button>
                </Link>
                <Link href="/sign-up" variant="plain" disableUnderline>
                  <Button color="purple" variant="solid">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
      <div tw="w-full">
        <nav css={[tw`flex w-full flex-col px-2 pt-2 pb-3 space-y-1`, !showMenu && tw`hidden`]}>
          <Link href="/" tw="px-3 py-2" highlightMatch>
            Home
          </Link>
          <Link href="/doc" tw="px-3 py-2" highlightMatch>
            Documents
          </Link>
          <Link href="/pricing" tw="px-3 py-2" highlightMatch>
            Pricing
          </Link>
          <Link href="/blog" tw="px-3 py-2" highlightMatch>
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
