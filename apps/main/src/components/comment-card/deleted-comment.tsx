import { Link } from '@chirpy-dev/ui';
import * as React from 'react';

export function DeletedComment(): JSX.Element {
  return (
    <div className="">
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
