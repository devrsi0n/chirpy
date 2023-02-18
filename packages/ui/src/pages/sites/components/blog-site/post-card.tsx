import { cpDayjs } from '@chirpy-dev/utils';
import Link from 'next/link';
import * as React from 'react';

import {
  Avatar,
  Heading,
  IconArrowUpRight,
  Text,
} from '../../../../components';
import { PostFields } from '../../types';

export type PostCardProps = PostFields;

export function PostCard(props: PostCardProps): JSX.Element {
  const [tag] = props.tags || [];
  return (
    <article>
      <Link href={`/post/${props.slug}`} className="relative block">
        <BlogImage src={props.coverImage} />
        <section className="mt-8 flex flex-col">
          <div className="flex w-fit items-center gap-2 rounded-full bg-primary-300 p-1 pr-2.5 text-xs font-medium text-primary-900">
            {tag && (
              <span className="rounded-full bg-gray-100 py-0.5 px-2">
                {tag}
              </span>
            )}
            <span>{props.readingTime} min read</span>
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
        <section className="mt-6 flex gap-3">
          <Avatar
            src={props.author.image}
            name={props.author.name}
            alt={`${props.author.name}'s avatar`}
          />
          <div>
            <Text size="sm" className="font-semibold">
              {props.author.name}
            </Text>
            <Text size="sm" variant="secondary">
              {cpDayjs(props.lastEditedTime).format('DD MMM YYYY')}
            </Text>
          </div>
        </section>
      </Link>
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
