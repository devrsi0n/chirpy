import { CommonPageProps, MDXProps } from '@chirpy-dev/types';
import clsx from 'clsx';
import { MDXRemote } from 'next-mdx-remote';

import {
  Footer,
  SiteLayout,
  MDXComponents,
  SideBar,
  SideBarProps,
} from '../../../blocks';
import { IconChevronRight, Link } from '../../../components';
import { listHoverable } from '../../../styles/common';

export type DocNav = {
  title: string;
  link: string;
};

export type NearNav = {
  prev?: DocNav;
  next?: DocNav;
};

export type DocsProps = MDXProps &
  Pick<SideBarProps, 'directories'> &
  CommonPageProps & { nearNav: NearNav };

export function Docs({
  mdxSource,
  frontMatter,
  directories = [],
  nearNav,
}: DocsProps): JSX.Element {
  return (
    <SiteLayout
      title={frontMatter?.title || 'Docs'}
      hideFullBleed
      hideFooter
      styles={{
        container: 'py-0 md:mx-0',
      }}
    >
      <div className="flex min-h-full flex-col">
        <section className="flex min-h-full w-full flex-1 flex-row space-x-4">
          <SideBar
            className="pt-10"
            directories={directories}
            title="Document"
          />
          <div className="flex-1">
            <article className="prose mx-auto overflow-x-hidden pt-10">
              {mdxSource && (
                <MDXRemote {...mdxSource} components={MDXComponents} />
              )}
            </article>
            <section className="mt-10">
              <div className="mx-auto flex max-w-[65ch] flex-row justify-between">
                {nearNav.prev ? (
                  <Link
                    size="lg"
                    variant="plain"
                    href={nearNav.prev.link}
                    className={clsx(
                      'flex flex-row items-center px-3 py-2 text-gray-1200 sm:-translate-x-5',
                      listHoverable,
                    )}
                  >
                    <IconChevronRight size={28} className="rotate-180" />
                    <span>{nearNav.prev.title}</span>
                  </Link>
                ) : (
                  // To fill left empty when there is only 1 next
                  <div />
                )}
                {nearNav.next && (
                  <Link
                    size="lg"
                    variant="plain"
                    href={nearNav.next.link}
                    className={clsx(
                      'flex flex-row items-center px-3 py-2 text-gray-1200 sm:translate-x-5',
                      listHoverable,
                    )}
                  >
                    <span>{nearNav.next.title}</span>
                    <IconChevronRight size={28} className="" />
                  </Link>
                )}
              </div>
            </section>
            <Footer />
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}

export { type SideBarProps } from '../../../blocks';
