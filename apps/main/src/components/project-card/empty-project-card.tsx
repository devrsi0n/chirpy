import { Heading, IconFolderPlus, Text } from '@chirpy-dev/ui';
import * as React from 'react';

export function EmptyProjectCard(): JSX.Element {
  return (
    <section className="flex w-fit flex-col items-center rounded border border-dashed px-12 py-8">
      <span className="mb-4">
        <IconFolderPlus size={36} />
      </span>
      <Heading as="h4" className="!text-base font-bold">
        No projects
      </Heading>
      <Text variant="secondary" size="sm">
        Get started by creating a new project
      </Text>
    </section>
  );
}
