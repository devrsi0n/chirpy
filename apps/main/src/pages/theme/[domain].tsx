import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from 'next';

import * as React from 'react';

import { SiteLayout } from '$/blocks/layout';
import { WidgetThemeProvider } from '$/contexts/theme-context';
import { getAdminGqlClient } from '$/lib/admin-gql-client';
import {
  ThemeProjectByPkDocument,
  ThemeProjectByPkQuery,
} from '$/server/graphql/generated/project';
import { getAllProjectStaticPathsByDomain } from '$/server/services/project';
import { Theme as ThemeType } from '$/types/theme.type';
import { ThemeEditor, THEME_WIDGET_CLS } from '$/blocks/theme-editor';

export type ThemeProps = StaticProps;

export default function ThemePage(props: ThemeProps): JSX.Element {
  return (
    <SiteLayout title={props.project?.name || 'Theme'}>
      <WidgetThemeProvider
        widgetTheme={props.project?.theme as ThemeType}
        selector={`.${THEME_WIDGET_CLS}`}
      >
        <ThemeEditor {...props} />
      </WidgetThemeProvider>
    </SiteLayout>
  );
}

type PathParams = {
  domain: string;
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const paths = await getAllProjectStaticPathsByDomain();

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
};

type StaticProps = {
  project: ThemeProjectByPkQuery['projects'][0];
};

export const getStaticProps: GetStaticProps<StaticProps, PathParams> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<GetStaticPropsResult<StaticProps>> => {
  if (!params?.domain) {
    return { notFound: true };
  }
  const { domain } = params;
  const client = getAdminGqlClient();
  const { data } = await client
    .query<ThemeProjectByPkQuery>(ThemeProjectByPkDocument, {
      domain,
    })
    .toPromise();

  if (!data?.projects || !data?.projects[0]) {
    return { notFound: true };
  }
  return {
    props: { project: data.projects[0] },
    revalidate: 1,
  };
};
