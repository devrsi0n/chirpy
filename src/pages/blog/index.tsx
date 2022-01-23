import { GetStaticProps } from 'next';
import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { SiteLayout } from '$/blocks/layout';
import { Heading } from '$/components/heading';
import { Image } from '$/components/image';
import { Link } from '$/components/link';
import { APP_NAME } from '$/lib/constants';
import { getDirectories } from '$/server/mdx/files';
import { Directory } from '$/server/types/file';
import { getBannerProps } from '$/utilities/image';

const CONTAINER_FOLDER = 'blog';

export type BlogHomeProps = {
  directories: Directory[];
};

export default function BlogHome({ directories }: BlogHomeProps): JSX.Element {
  return (
    <SiteLayout>
      <Head>
        <title>{APP_NAME} blog</title>
      </Head>

      <div tw="min-h-full">
        <Heading tw="my-10 font-bold">Blog</Heading>
        <section tw="flex flex-row py-10 min-h-full space-x-2">
          {directories.map((dir) => {
            const bannerProps = getBannerProps(dir.banner!);
            return (
              <article key={dir.route}>
                <Link href={dir.route!} variant="plain">
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
