import * as React from 'react';

import { PageTitle, SiteLayout } from '../../../blocks';
import { Button, openInNewTab, Text } from '../../../components';

export function CreateSite(): JSX.Element {
  return (
    <SiteLayout title="Create site">
      <PageTitle>Create your blog site</PageTitle>
      <Text>Duplicate the blog template and copy the share link</Text>
      <section className="mt-8">
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
      </section>
    </SiteLayout>
  );
}
