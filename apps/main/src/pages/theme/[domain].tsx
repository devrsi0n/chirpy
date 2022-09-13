import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import * as React from 'react';

import { SiteLayout } from '$/blocks/layout';
import {
  ThemeEditor,
  ThemeEditorProps,
  THEME_WIDGET_CLS,
} from '$/blocks/theme-editor';
import { WidgetThemeProvider } from '$/contexts/theme-context';
import { query } from '$/server/common/gql';
import {
  ThemeProjectByPkDocument,
  ThemeProjectByPkQuery,
} from '$/server/graphql/generated/project';
import { getAllProjectStaticPathsByDomain } from '$/server/services/project';
import { Theme as ThemeType } from '$/types/theme.type';

export type ThemeProps = StaticProps;

export default function ThemePage(props: ThemeProps): JSX.Element {
  return (
    <SiteLayout
      title={props.project?.name || 'Theme'}
      styles={{
        container: `!grid-cols-[1fr_min(105ch,calc(100%-32px))_1fr]`,
      }}
    >
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
} & Pick<ThemeEditorProps, 'buildDate'>;

export const getStaticProps: GetStaticProps<StaticProps, PathParams> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<
  GetStaticPropsResult<StaticProps>
> => {
  if (!params?.domain) {
    return { notFound: true };
  }
  const { domain } = params;
  const projects = await query(
    ThemeProjectByPkDocument,
    {
      domain,
    },
    'projects',
  );

  if (!projects || !projects[0]) {
    return { notFound: true };
  }
  return {
    props: { project: projects[0], buildDate: new Date().toISOString() },
    revalidate: 60 * 60,
  };
};
