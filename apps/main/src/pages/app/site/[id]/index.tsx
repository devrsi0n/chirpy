import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';

export { SiteIndex as default } from '@chirpy-dev/ui';

export const getStaticPaths = async () => {
  return {
    paths: [
      //
    ],
    fallback: 'blocking',
  };
};

export type StaticProps = {
  id: string;
};

export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<StaticProps>> => {
  if (typeof params?.id !== 'string') {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      id: params.id,
    },
  };
};
