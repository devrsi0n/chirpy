import { prisma } from '@chirpy-dev/trpc';
import { cpDayjs } from '@chirpy-dev/ui';
import { getAppURL } from '@chirpy-dev/utils';
import { GetStaticProps, GetStaticPropsResult } from 'next';
import { log } from 'next-axiom';

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
  const beforeDate = cpDayjs().subtract(1, 'day').toISOString();

  const result = await prisma.comment.deleteMany({
    where: {
      createdAt: {
        lt: beforeDate,
      },
      page: {
        url: `${getAppURL()}/play`,
      },
    },
  });
  log.debug('DeleteStaleComments, affected rows:', result.count);
  return {
    revalidate: 60 * 60,
    // We only need it to trigger periodicity tasks, no need props
    props: {},
  };
};

export { PlayGround as default } from '@chirpy-dev/ui';
