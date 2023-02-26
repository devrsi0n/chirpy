import { cpDayjs } from '@chirpy-dev/utils';
import clsx from 'clsx';
import Link from 'next/link';
import * as React from 'react';
import Balancer from 'react-wrap-balancer';

import {
  Avatar,
  Heading,
  IconArrowUpRight,
  Text,
} from '../../../../components';
import { PostFields } from '../../types';

export type PostCardProps = PostFields & {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
};

export function PostCard({
  orientation = 'vertical',
  ...restProps
}: PostCardProps): JSX.Element {
  const [tag] = restProps.tags || [];
  const isHorizontal = orientation === 'horizontal';
  return (
    <article
      className={clsx(
        'flex flex-col',
        isHorizontal && 'sm:!flex-row',
        restProps.className,
      )}
    >
      <Link href={`/post/${restProps.slug}`} className="min-w-[200px] flex-1">
        <BlogImage src={restProps.coverImage} />
      </Link>
      <div className={clsx(isHorizontal ? 'sm:ml-8 sm:max-w-sm' : 'mt-8')}>
        <section className="flex flex-col">
          <p className="flex w-fit items-center gap-2 rounded-full bg-primary-300 p-1 pr-2.5 text-xs font-medium text-primary-900 dark:text-primary-1100">
            {tag && (
              <span className="rounded-full bg-gray-100 py-0.5 px-2">
                {tag}
              </span>
            )}
            <span>{restProps.readingTime} min read</span>
          </p>
          <div className="mt-4 flex items-start gap-4">
            <Heading as="h4" className="font-semibold">
              <Link href={`/post/${restProps.slug}`}>
                <Balancer>{restProps.title}</Balancer>
              </Link>
            </Heading>
            <span className="pt-1 pr-1">
              <IconArrowUpRight size={24} />
            </span>
          </div>
          {restProps.excerpt && (
            <Text
              variant="secondary"
              className="mt-2 line-clamp-2"
              title={restProps.excerpt}
            >
              {restProps.excerpt}
            </Text>
          )}
        </section>
        <section className="mt-6 flex gap-3">
          <Avatar
            src={restProps.author.image}
            name={restProps.author.name}
            alt={`${restProps.author.name}'s avatar`}
          />
          <div>
            <Text size="sm" className="font-semibold">
              {restProps.author.name}
            </Text>
            <Text size="sm" variant="secondary">
              {cpDayjs(restProps.lastEditedTime).format('DD MMM YYYY')}
            </Text>
          </div>
        </section>
      </div>
    </article>
  );
}

type BlogImageProps = {
  src: string | null;
};
const FALLBACK_IMAGE = '/images/blog/placeholder.jpeg';
function BlogImage({ src }: BlogImageProps) {
  return (
    <img
      onError={({ currentTarget }) => {
        console.warn(
          'Failed to load image, fallback to placeholder',
          currentTarget.src,
        );
        // eslint-disable-next-line unicorn/prefer-add-event-listener
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = FALLBACK_IMAGE;
      }}
      src={src || FALLBACK_IMAGE}
      alt="Post's cover image"
      className="h-60 w-full object-cover"
    />
  );
}
