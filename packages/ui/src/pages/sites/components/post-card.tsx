import Link from 'next/link';
import * as React from 'react';

import { Card, Heading } from '../../../components';
import { SitesPage } from '../types';

export type PostCardProps = SitesPage;

export function PostCard(props: PostCardProps): JSX.Element {
  return (
    <Card as="article">
      <Link href={`/post/${props.slug}`}>
        <img src={props.image || ''} alt="Post cover or main image" />
        <Heading>{props.title}</Heading>
      </Link>
    </Card>
  );
}
