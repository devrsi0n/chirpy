import Link from 'next/link';
import * as React from 'react';

import { Heading, IconArrowUpRight } from '../../../../components';
import { PostPage } from '../../types';

export type PostCardProps = PostPage;

export function PostCard(props: PostCardProps): JSX.Element {
  const [tag] = props.tags || [];
  return (
    <article className="group">
      <Link href={`/post/${props.slug}`} className="relative block">
        <img
          src={props.coverImage || ''}
          alt="Post's cover image"
          className="h-60 w-full object-cover"
        />
        <section className="mt-8 flex flex-col">
          <div className="flex w-fit items-center gap-2 rounded-full bg-primary-300 p-1 pr-2.5 text-xs font-medium text-primary-900">
            {tag && (
              <span className="rounded-full bg-gray-100 py-0.5 px-2">
                {tag}
              </span>
            )}
            <span>8 min read</span>
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
