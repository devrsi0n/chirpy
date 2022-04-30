import { GetStaticProps } from 'next';
import * as React from 'react';

import { SiteLayout } from '$/blocks/layout';
import { Heading } from '$/components/heading';
import { Image } from '$/components/image';
import { Link } from '$/components/link';
import { getDirectories } from '$/server/mdx/files';
import { Directory } from '$/server/types/file';
import { getBannerProps } from '$/utilities/image';

const CONTAINER_FOLDER = 'blog';

export type BlogHomeProps = {
  directories: Directory[];
};

export default function BlogHome({ directories }: BlogHomeProps): JSX.Element {
  return (
    <SiteLayout title="Blog">
      <div className="min-h-full">
        <Heading className="my-10 font-bold">Blog</Heading>
        <section className="flex flex-row py-10 min-h-full space-x-2">
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

export const getStaticProps: GetStaticProps<BlogHomeProps> = async () => {
  const directories = await getDirectories(CONTAINER_FOLDER, `/${CONTAINER_FOLDER}`);
  return {
    props: {
      directories,
    },
    revalidate: 3600,
  };
};
