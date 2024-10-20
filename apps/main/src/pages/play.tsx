import { prisma } from '@chirpy-dev/trpc';
import { Alert, cpDayjs } from '@chirpy-dev/ui';
import { getAppURL } from '@chirpy-dev/utils';
import { GetStaticProps, GetStaticPropsResult } from 'next';
import { log } from 'next-axiom';
import * as React from 'react';

import { CommentWidget } from '../components/comment-widget';
import { SiteLayout } from '../components/layout';
import { PageTitle } from '../components/page-title';

type StaticProps = {
  //
};

export const getStaticProps: GetStaticProps<StaticProps> = async (): Promise<
  GetStaticPropsResult<StaticProps>
> => {
  const beforeDate = cpDayjs().subtract(1, 'day').toDate();

  const result = await prisma.comment.deleteMany({
    where: {
      createdAt: {
        lt: beforeDate,
      },
      // Only delete comments that have no replies or there'll be a prisma error
      replies: {
        none: {},
      },
      page: {
        url: `${getAppURL()}/play`,
      },
    },
  });
  log.debug('DeleteStaleComments, affected rows:', {
    count: result.count,
  });
  return {
    revalidate: 60 * 60,
    // We only need it to trigger periodicity tasks, no need props
    props: {},
  };
};

export default function PlayGround(): JSX.Element {
  const [showAlert, setShowAlert] = React.useState(true);
  return (
    <SiteLayout title="Playground">
      <div className="space-y-8">
        <PageTitle>Playground</PageTitle>
        {showAlert && (
          <Alert
            type="info"
            title="Feel free to play around"
            content={'We remove stale comments every 24 hours automatically.'}
            onClickDismiss={() => setShowAlert(false)}
            hideDismissButton
          />
        )}
      </div>
      <CommentWidget />
    </SiteLayout>
  );
}
