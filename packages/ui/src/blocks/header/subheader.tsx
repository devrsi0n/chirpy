import clsx from 'clsx';
import { Link } from '../../components/link';
import { useRouter } from 'next/router';
import { useCurrentUser } from '../../contexts/current-user-context/use-current-user';

export function SubHeader({ fixedPos }: { fixedPos: boolean }) {
  const { pathname } = useRouter();
  const { data} = useCurrentUser();
  if (!pathname.startsWith('/dashboard') && !pathname.startsWith('/settings')) {
    return null;
  }
  return (
    <section
      className={clsx(
        navBarStyles,
        fixedPos && `z-10 sm:fixed sm:left-0 sm:top-0`,
      )}
    >
      <nav className="flex w-full max-w-7xl gap-8">
        <Link href={`/dashboard/${data.username}`}>Overview</Link>
        <Link href="/settings">Settings</Link>
      </nav>
    </section>
  );
}

export const navBarStyles = clsx(
  'relative flex justify-center',
  // Can't use the normal backdrop-filter here as it'll cause nested blur elements not working in chrome.
  'before:z-index-[-1] before:absolute before:inset-0 before:bg-gray-100 before:bg-opacity-75 before:backdrop-blur-xl before:backdrop-saturate-150 dark:before:bg-gray-300 before:dark:bg-opacity-70',
  `mx-auto w-full px-2 py-3 sm:px-6 lg:px-8 shadow-xs`,
);
