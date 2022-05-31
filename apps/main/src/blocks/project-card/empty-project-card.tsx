import FolderPlus from '@geist-ui/react-icons/folderPlus';
import clsx from 'clsx';
import * as React from 'react';

import { Heading } from '$/components/heading';
import { Text } from '$/components/text';

export function EmptyProjectCard(): JSX.Element {
  return (
    <section className="flex w-fit flex-col items-center rounded border border-dashed py-8 px-12">
      <span className="mb-4">
        <FolderPlus size={36} />
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
