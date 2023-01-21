import * as React from 'react';

import { PageTitle } from '../../../../blocks';
import { Button, openInNewTab, Text, Video } from '../../../../components';
import { PaginationLink } from '../../../home/docs/pagination';
import { AppLayout } from '../../components/app-layout';

export function CreateSite(): JSX.Element {
  return (
    <AppLayout title="Create site">
      <PageTitle>Create your blog site</PageTitle>
      <section className="">
        <Text className="mb-4">
          Duplicate the blog template and copy the sharing link
        </Text>
        <Button
          onClick={() =>
            openInNewTab(
              'https://www.notion.so/Chirpy-blog-template-c1c17f47bb364b12a847db9d5d4edf70?duplicate=true',
            )
          }
          color="primary"
        >
          Duplicate template
        </Button>
        <div className="mt-6 space-y-4">
          <Text className="">Learn how to 👇</Text>
          <Video src="/videos/app/site/duplicate-template.mp4" />
        </div>
      </section>
      <div className="mt-6 flex justify-end">
        <PaginationLink type="next" href="/site/create/form">
          Next step
        </PaginationLink>
      </div>
    </AppLayout>
  );
}

export * from './create-form';
