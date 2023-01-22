import { Directory } from '@chirpy-dev/types';
import * as React from 'react';

import { SiteLayout } from '../../../blocks';
import { Heading, Image, Link } from '../../../components';
import { getBannerProps } from '../../../utilities';

export type BlogHomeProps = {
  directories: Directory[];
};

export function BlogHome({ directories }: BlogHomeProps): JSX.Element {
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
