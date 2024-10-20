import { ssg } from '@chirpy-dev/trpc';
import { RouterOutputs } from '@chirpy-dev/trpc/src/client';
import { Theme as ThemeType } from '@chirpy-dev/types';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';

import { WidgetThemeProvider } from '$/contexts';
import { getRecentProjectStaticPathsByDomain } from '$/server/services/project';
import type { CommentWidgetPreviewProps } from '../../../../components/comment-widget-preview';
import { SiteLayout } from '../../../../components/layout';
import { ThemeEditor } from '../../../../components/theme-editor';
import { THEME_WIDGET_CLS } from '../../../../components/theme-editor/theme-editor';

type PathParams = {
  domain: string;
  username: string;
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const paths = await getRecentProjectStaticPathsByDomain(50);

  return { paths, fallback: 'blocking' };
};

type StaticProps = ThemeProps;

export const getStaticProps: GetStaticProps<StaticProps, PathParams> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<
  GetStaticPropsResult<StaticProps>
> => {
  if (!params?.domain || !params?.username) {
    return { notFound: true };
  }
  const { domain } = params;
  const project = await ssg.project.byDomain.fetch(domain);
  if (!project?.id) {
    return { notFound: true };
  }
  return {
    props: {
      project,
      buildDate: new Date().toISOString(),
      username: params.username,
    },
    revalidate: 60,
  };
};

export type ThemeProps = {
  project: NonNullable<RouterOutputs['project']['byDomain']>;
  username: string;
} & Pick<CommentWidgetPreviewProps, 'buildDate'>;

export default function ThemePage({
  project,
  buildDate,
  username,
}: ThemeProps): JSX.Element {
  return (
    <SiteLayout
      title={project?.name || 'Theme'}
      styles={{
        container: `!grid-cols-[1fr_min(105ch,calc(100%-32px))_1fr]`,
      }}
    >
      <WidgetThemeProvider
        widgetTheme={project?.theme as ThemeType}
        selector={`.${THEME_WIDGET_CLS}`}
      >
        <ThemeEditor
          username={username}
          project={project}
          buildDate={buildDate}
        />
      </WidgetThemeProvider>
    </SiteLayout>
  );
}
