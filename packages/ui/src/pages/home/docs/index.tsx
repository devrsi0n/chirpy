import { CommonPageProps, MDXProps } from '@chirpy-dev/types';
import { MDXRemote } from 'next-mdx-remote';

import {
  Footer,
  SiteLayout,
  MDXComponents,
  SideBar,
  SideBarProps,
} from '../../../blocks';
import { PaginationLink } from './pagination';

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
                  <PaginationLink
                    href={nearNav.prev.link}
                    type="prev"
                    className="sm:translate-x-5"
                  >
                    {nearNav.prev.title}
                  </PaginationLink>
                ) : (
                  // To fill left empty when there is only 1 next
                  <div />
                )}
                {nearNav.next && (
                  <PaginationLink
                    href={nearNav.next.link}
                    type="prev"
                    className="sm:translate-x-5"
                  >
                    {nearNav.next.title}
                  </PaginationLink>
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
