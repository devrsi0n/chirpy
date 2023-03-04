import * as React from 'react';

import {
  Button,
  Heading,
  IconExternalLink,
  openInNewTab,
  Text,
  Video,
} from '../../../../components';
import { PaginationLink } from '../../../home/docs/pagination';
import { AppLayout } from '../../components/app-layout';

const title = 'Duplicate and copy the URL';

export function CreateSite(): JSX.Element {
  return (
    <AppLayout title={title}>
      <section className="flex flex-col gap-10">
        <p className="text-base font-semibold text-primary-900">
          Create new site
        </p>
        <section className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Heading as="h1" className="text-display-md font-semibold">
              {title}
            </Heading>
            <Text>Skip it if you already copied the URL</Text>
          </div>
          <div>
            <Button
              onClick={() =>
                openInNewTab(
                  'https://www.notion.so/Chirpy-blog-template-c1c17f47bb364b12a847db9d5d4edf70?duplicate=true',
                )
              }
              variant="primary"
              className="gap-2"
            >
              <span>Duplicate Notion template</span>
              <IconExternalLink size={20} />
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <Text className="">
              Learn how to duplicate the Notion template and copy the sharing
              URL
            </Text>
            <Video
              src="/videos/app/site/duplicate-template.mp4"
              className="max-w-3xl"
            />
          </div>
        </section>
        <div>
          <PaginationLink type="next" href="/site/create/form">
            Next
          </PaginationLink>
        </div>
      </section>
    </AppLayout>
  );
}

export * from './create-form';
