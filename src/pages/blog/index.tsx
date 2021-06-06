import { GetStaticProps } from 'next';
import Head from 'next/head';
import * as React from 'react';
import 'twin.macro';

import { Heading } from '$/components/Heading';
import { Image } from '$/components/Image';
import { Layout } from '$/components/Layout';
import { Link } from '$/components/Link';
import { getBannerProps } from '$/utilities/image';

import { getDirectories } from '$shared/files';
import { Directory } from '$shared/types/file';

const CONTAINER_FOLDER = 'blog';

export type BlogHomeProps = {
  directories: Directory[];
};

export default function BlogHome({ directories }: BlogHomeProps): JSX.Element {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <Layout noContainer noFooter>
        <div tw="min-h-full" className="main-container">
          <Heading tw="my-10 font-bold">Blog</Heading>
          <section tw="flex flex-row py-10 min-h-full space-x-2">
            {directories.map((dir) => {
              const bannerProps = getBannerProps(dir.banner!);
              return (
                <article key={dir.route}>
                  <Link href={dir.route!} variant="plain">
                    {bannerProps && <Image {...bannerProps} />}
                    <Heading as="h4">{dir.title}</Heading>
                  </Link>
                </article>
              );
            })}
          </section>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps<BlogHomeProps> = async () => {
  const directories = await getDirectories(CONTAINER_FOLDER, `/${CONTAINER_FOLDER}`);
  return { props: { directories }, revalidate: 3600 };
};
