import { Directory } from '@chirpy-dev/types';
import { getBannerProps, Heading, Image, Link } from '@chirpy-dev/ui';
import { GetStaticProps } from 'next';
import * as React from 'react';

import { getDirectories } from '$/server/mdx/files';
import { SiteLayout } from '../../components/layout';

const CONTAINER_FOLDER = 'blog';

export type BlogHomeProps = {
  directories: Directory[];
};

export const getStaticProps: GetStaticProps<BlogHomeProps> = async () => {
  const directories = await getDirectories(
    CONTAINER_FOLDER,
    `/${CONTAINER_FOLDER}`,
  );
  return {
    props: {
      directories,
    },
    revalidate: 3600,
  };
};

export default function BlogHome({ directories }: BlogHomeProps): JSX.Element {
  return (
    <SiteLayout title="Blog">
      <div className="min-h-full">
        <Heading className="my-10 font-bold">Blog</Heading>
        <section className="flex min-h-full flex-row space-x-2 py-10">
          {directories.map((dir) => {
            if (!dir.route) {
              return <></>;
            }
            const bannerProps = getBannerProps(dir.banner);
            return (
              <article key={dir.route}>
                <Link href={dir.route} variant="plain">
                  {bannerProps && <Image {...bannerProps} alt="Banner" />}
                  <Heading as="h4">{dir.title}</Heading>
                </Link>
              </article>
            );
          })}
        </section>
      </div>
    </SiteLayout>
  );
}
