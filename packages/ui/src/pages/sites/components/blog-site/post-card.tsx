import Link from 'next/link';
import * as React from 'react';

import { Card, Heading } from '../../../../components';
import { PostPage } from '../../types';

export type PostCardProps = PostPage;

export function PostCard(props: PostCardProps): JSX.Element {
  return (
    <Card as="article">
      <Link href={`/post/${props.slug}`}>
        <img src={props.coverImage || ''} alt="Post's cover image" />
        <Heading>{props.title}</Heading>
      </Link>
    </Card>
  );
}
