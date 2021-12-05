import * as React from 'react';
import FlipMove from 'react-flip-move';

import { Link } from '$/components/Link';
import { usePrevious } from '$/hooks/usePrevious';

import * as api from '../../api';
import FadeIn from '../../fade-in';
import LazyLoader from '../../lazy-loader';
import numberFormatter from '../../number-formatter';
import { itemBg } from '../../styles';
import { Timer } from '../../timer';
import { Props } from '../../type';
import * as url from '../../url';
import { EmptyState } from '../empty-state';
import Bar from '../bar';
import MoreLink from '../more-link';

export interface PageRankProps extends Props {
  timer?: Timer;
  apiPath: 'entry-pages' | 'exit-pages' | 'pages';
}

export function PageRank(props: PageRankProps) {
  const [loading, setLoading] = React.useState(false);
  const [pages, setPages] = React.useState<Page[]>([]);

  const fetchPages = () => {
    api
      .get(`/api/stats/${encodeURIComponent(props.site.domain)}/${props.apiPath}`, props.query)
      .then((res) => {
        setPages(res);
        setLoading(false);
      });
  };
  const prevQuery = usePrevious(props.query);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (prevQuery !== props.query) {
      setLoading(true);
      setPages([]);
      fetchPages();
    }
  });
  const onVisible = () => {
    fetchPages();
    props.timer?.onTick(fetchPages);
  };

  return (
    <LazyLoader onVisible={onVisible} className="flex flex-col flex-grow">
      {loading && (
        <div className="mx-auto loading mt-44">
          <div></div>
        </div>
      )}
      <FadeIn show={!loading} className="flex-grow">
        <List pages={pages} query={props.query} apiPath={props.apiPath} site={props.site} />
      </FadeIn>
      {!loading && <MoreLink site={props.site} list={pages!} endpoint="pages" />}
    </LazyLoader>
  );
}

type ListProps = {
  pages: Page[];
} & Pick<PageRankProps, 'query' | 'apiPath' | 'site'>;

function List(props: ListProps) {
  const label = () => {
    if (props.query.period === 'realtime') {
      return 'Current visitors';
    }

    if (showConversionRate()) {
      return 'Conversions';
    }
    switch (props.apiPath) {
      case 'entry-pages':
        return 'Unique Entrances';
      case 'exit-pages':
        return 'Unique Exits';
      case 'pages':
        return 'Visitors';
    }
  };
  const showConversionRate = () => {
    return !!props.query.filters.goal;
  };
  if (props.pages?.length > 0) {
    return (
      <>
        <div className="flex items-center justify-between mt-3 mb-2 text-xs font-bold tracking-wide text-gray-1100">
          <span>Page url</span>
          <div className="text-right">
            <span className="inline-block w-30">{label()}</span>
            {showConversionRate() && <span className="inline-block w-20">CR</span>}
          </div>
        </div>

        <FlipMove>
          {props.pages?.map((page) => (
            <Page
              key={page.name}
              page={page}
              showConversionRate={showConversionRate()}
              pages={props.pages}
              site={props.site}
              query={props.query}
            />
          ))}
        </FlipMove>
      </>
    );
  }
  return <EmptyState />;
}

type PageProps = Props & {
  showConversionRate: boolean;
  page: Page;
  pages: Page[];
};

function Page({ page, site, pages, showConversionRate }: PageProps) {
  const externalLink = url.externalLinkForPage(site.domain, page.name);
  const maxWidthDeduction = showConversionRate ? '10rem' : '5rem';

  return (
    <div className="flex items-center justify-between my-1 text-sm" key={page.name}>
      <Bar count={page.count} all={pages} css={itemBg} maxWidthDeduction={maxWidthDeduction}>
        <span className="flex px-2 py-1.5 group dark:text-gray-300 relative break-all z-9">
          <Link
            href={url.setQuery('entry_page', page.name)}
            className="md:truncate block hover:underline"
            disabled
          >
            {page.name}
          </Link>
          <a
            target="_blank"
            rel="noreferrer"
            href={externalLink}
            className="hidden group-hover:block"
          >
            <svg
              className="inline w-4 h-4 ml-1 -mt-1 text-gray-600 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
            </svg>
          </a>
        </span>
      </Bar>
      <span className="font-medium dark:text-gray-200 w-20 text-right">
        {numberFormatter(page.count)}
      </span>
      {showConversionRate && (
        <span className="font-medium dark:text-gray-200 w-20 text-right">
          {numberFormatter(page.conversion_rate)}%
        </span>
      )}
    </div>
  );
}

export interface Page {
  name: string;
  count: number;
  unique_entrances: number;
  conversion_rate: number;
  unique_exits: number;
  visitors: number;
  total_visitors: number;
  total_entrances: number;
  visit_duration: number;
  bounce_rate: number;
}
