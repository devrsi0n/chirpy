import * as React from 'react';

import { PageTitle, SiteLayout } from '../../blocks';
import { Button, Heading, Text } from '../../components';

export type ProjectSettingsProps = {
  //
};

export function ProjectSettings(props: ProjectSettingsProps): JSX.Element {
  return (
    <SiteLayout title="Project settings">
      <PageTitle>Project settings</PageTitle>
      <section className="mt-10 rounded border">
        <div className="space-y-3 p-5">
          <Heading as="h3" className="font-medium">
            Delete project
          </Heading>
          <Text variant="secondary">
            Deleting this project will permanently remove all associated data,
            including comments and analytics. This action cannot be undone.
          </Text>
        </div>
        <footer className="flex justify-end border-t bg-gray-300 px-5 py-3">
          <Button variant="solid" color="red">
            Delete
          </Button>
        </footer>
      </section>
    </SiteLayout>
  );
}
