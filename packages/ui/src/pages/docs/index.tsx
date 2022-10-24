import { MDXRemote } from 'next-mdx-remote';

import {
  Footer,
  SiteLayout,
  MDXComponents,
  SideBar,
  SideBarProps,
} from '../../blocks';
import { CommonPageProps, MDXProps } from 'types';

type DocsProps = MDXProps & Pick<SideBarProps, 'directories'> & CommonPageProps;

export function Docs({
  mdxSource,
  frontMatter,
  directories = [],
}: DocsProps): JSX.Element {
  return (
    <SiteLayout
      title={frontMatter?.title || 'Docs'}
      hideFullBleed
      hideFooter
      styles={{
        container: 'py-0',
      }}
    >
      <div className="flex min-h-full flex-col">
        <section className="flex min-h-full w-full flex-1 flex-row space-x-4">
          <SideBar
            className="pt-10"
            directories={directories}
            title="Documentation"
          />
          <div className="flex-1">
            <article className="prose mx-auto overflow-x-hidden pt-10">
              {mdxSource && (
                <MDXRemote {...mdxSource} components={MDXComponents} />
              )}
            </article>
            <Footer />
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
export type { SideBarProps };
