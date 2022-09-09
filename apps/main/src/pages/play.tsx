import { GetStaticProps, GetStaticPropsResult } from 'next';
import { log } from 'next-axiom';
import * as React from 'react';

import { CommentWidget } from '$/blocks/comment-widget';
import { SiteLayout } from '$/blocks/layout';
import { PageTitle } from '$/blocks/page-title';
import { Alert } from '$/components/alert';
import { mutate } from '$/server/common/gql';
import { DeleteStaleCommentsDocument } from '$/server/graphql/generated/comment';
import { isENVDev } from '$/server/utilities/env';
import { cpDayjs } from '$/utilities/date';

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
            content="We remove stale comments every 24hours automatically."
            onClickDismiss={() => setShowAlert(false)}
            hideDismissButton
          />
        )}
      </div>
      <CommentWidget />
    </SiteLayout>
  );
}

type StaticProps = {
  //
};

export const getStaticProps: GetStaticProps<StaticProps> = async (): Promise<
  GetStaticPropsResult<StaticProps>
> => {
  const beforeDate = cpDayjs()
    .subtract(1, isENVDev ? 'second' : 'day')
    .toISOString();
  const data = await mutate(
    DeleteStaleCommentsDocument,
    {
      beforeDate,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/play`,
    },
    'deleteComments',
  );
  log.debug('DeleteStaleComments, affected rows:', data.affected_rows);
  return {
    revalidate: 60 * 60,
    props: {},
  };
};
