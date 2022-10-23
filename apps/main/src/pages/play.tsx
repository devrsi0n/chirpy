import { GetStaticProps, GetStaticPropsResult } from 'next';
import { log } from 'next-axiom';
import * as React from 'react';

import { CommentWidget, SiteLayout, PageTitle, Alert } from 'ui';
import { mutate } from '$/server/common/gql';
import { DeleteStaleCommentsDocument } from '@chirpy-dev/graphql';
import { isENVDev, getAppURL } from 'utils';
import { cpDayjs } from 'ui';

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
            content={
              process.env.DOCKER
                ? `We don't remove comment automatically`
                : 'We remove stale comments every 24 hours automatically.'
            }
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
  if (process.env.DOCKER) {
    return {
      props: {},
    };
  }
  const beforeDate = cpDayjs()
    .subtract(1, isENVDev ? 'hour' : 'day')
    .toISOString();
  const data = await mutate(
    DeleteStaleCommentsDocument,
    {
      beforeDate,
      url: `${getAppURL()}/play`,
    },
    'deleteComments',
  );
  log.debug('DeleteStaleComments, affected rows:', data.affected_rows);
  return {
    revalidate: 60 * 60,
    // We only need it to trigger periodicity tasks, no need props
    props: {},
  };
};
