import * as React from 'react';

import { Link } from '../../components/link';

export function DeletedComment(): JSX.Element {
  return (
    <div className="">
      <Link
        origin="home"
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
