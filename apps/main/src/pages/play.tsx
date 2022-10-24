import { GetStaticProps, GetStaticPropsResult } from 'next';
import { log } from 'next-axiom';

import { PlayGround } from 'ui';
import { mutate } from '$/server/common/gql';
import { DeleteStaleCommentsDocument } from '@chirpy-dev/graphql';
import { isENVDev, getAppURL } from 'utils';
import { cpDayjs } from 'ui';

export default PlayGround;

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
