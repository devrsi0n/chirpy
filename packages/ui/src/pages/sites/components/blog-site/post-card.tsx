import Link from 'next/link';
import * as React from 'react';

import { Heading, IconArrowUpRight } from '../../../../components';
import { PostPage } from '../../types';

export type PostCardProps = PostPage;

export function PostCard(props: PostCardProps): JSX.Element {
  return (
    <article className="group">
      <Link href={`/post/${props.slug}`} className="relative block">
        <img
          src={props.coverImage || ''}
          alt="Post's cover image"
          className="h-60 w-full object-cover"
        />
        <section className="mt-8 flex flex-col">
          <div className="w-fit rounded-full bg-primary-300 px-2.5 py-1.5 text-xs font-medium  text-primary-900">
            8 min read
          </div>
          <div className="mt-4 flex items-start gap-4">
            <Heading as="h4" className="font-semibold">
              {props.title}
            </Heading>
            <span className="pt-1 pr-1">
              <IconArrowUpRight size={24} />
            </span>
          </div>
        </section>
      </Link>
    </article>
  );
}
