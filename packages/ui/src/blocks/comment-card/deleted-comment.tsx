import * as React from 'react';

import { Link } from '../../components/link';

export function DeletedComment(): JSX.Element {
  return (
    <div className="flex h-[50px] items-end ps-4">
      <Link
        variant="plain"
        href="/docs/features/moderate#deleted-note"
        className="italic"
        target="_blank"
      >
        This comment was deleted by moderator
      </Link>
    </div>
  );
}
