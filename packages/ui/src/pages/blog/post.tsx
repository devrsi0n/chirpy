import { MDXRemote } from 'next-mdx-remote';
import * as React from 'react';
import { MDXProps } from 'types';

import { CommentWidget, SiteLayout, MDXComponents } from '../../blocks';
import { useHasMounted } from '../../hooks';
import { Image } from '../../components';
import { getBannerProps } from '../../utils';

type BlogProps = MDXProps;

export function BlogPost({ mdxSource, frontMatter }: BlogProps): JSX.Element {
  const hasMounted = useHasMounted();
  const banner = React.useMemo(() => {
    if (frontMatter?.banner && hasMounted) {
      return getBannerProps(frontMatter.banner);
    }
  }, [frontMatter?.banner, hasMounted]);

  return (
    <SiteLayout title={frontMatter?.title || 'Blog'}>
      <section className="flex flex-row space-x-2">
        <article className="prose flex-1 overflow-y-auto">
          {banner && (
            <div className="pb-10">
              <Image {...banner} layout="responsive" alt="banner" />
            </div>
          )}
          {mdxSource && <MDXRemote {...mdxSource} components={MDXComponents} />}
        </article>
      </section>
      <CommentWidget />
    </SiteLayout>
  );
}
