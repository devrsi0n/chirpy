import * as React from 'react';
import clsx from 'clsx';
import { PageTitle, SiteLayout } from '../../blocks';

export type ProjectProps = {
  children: React.ReactNode;
  
};

export function Project(props: ProjectProps): JSX.Element {
  return <SiteLayout title='Project'>
    <PageTitle>Project</PageTitle>
  </SiteLayout>;
}
