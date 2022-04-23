import { useRouter } from 'next/router';
import * as React from 'react';

import { Heading } from '$/components/heading';

import './analytics.scss';
import Datepicker from './datepicker';
import Filters from './filters';
import { parseQuery } from './query';
import { SiteIcon } from './site-icon';
import Conversions from './stats/conversions';
import Devices from './stats/devices';
import Locations from './stats/locations';
import Pages from './stats/pages';
import Sources from './stats/sources';
import VisitorGraph from './stats/visitor-graph';
import { Timer } from './timer';
import { Site } from './type';

export interface RealtimeProps {
  stuck: boolean;
  site: Site;
  loggedIn: boolean;
  currentUserRole: 'owner' | 'admin' | 'public';
}

export default function Realtime(props: RealtimeProps) {
  const [query, setQuery] = React.useState(() => parseQuery(window.location.search, props.site));
  const router = useRouter();

  React.useEffect(() => {
    setQuery(parseQuery(location.search, props.site));
  }, [router.asPath, props.site]);
  const [timer] = React.useState(() => new Timer());
  const navClass = props.site.embedded ? 'relative' : 'sticky';
  return (
    <>
      <div className="mb-12">
        <div id="stats-container-top"></div>
        <div
          className={`${navClass} top-0 sm:py-3 py-2 z-10 ${
            props.stuck && !props.site.embedded
              ? 'fullwidth-shadow bg-gray-50 dark:bg-gray-850'
              : ''
          }`}
        >
          <div className="items-center w-full flex">
            <div className="flex items-center w-full">
              <SiteHeader site={props.site} />
              <Filters className="flex" site={props.site} query={query} router={router} />
            </div>
            <Datepicker site={props.site} query={query} router={router} />
          </div>
        </div>
        <VisitorGraph site={props.site} query={query} timer={timer} router={router} />
        <div className="items-start justify-between block w-full md:flex">
          <Sources site={props.site} query={query} timer={timer} />
          <Pages site={props.site} query={query} timer={timer} />
        </div>
        <div className="items-start justify-between block w-full md:flex">
          <Locations router={router} site={props.site} query={query} timer={timer} />
          <Devices site={props.site} query={query} />
        </div>

        {props.site.hasGoals && (
          <div className="items-start justify-between block w-full mt-6 md:flex">
            <Conversions site={props.site} query={query} title="Goal Conversions (last 30 min)" />
          </div>
        )}
      </div>
    </>
  );
}

interface SiteHeaderProps {
  site: Site;
}

function SiteHeader({ site }: SiteHeaderProps): JSX.Element {
  return (
    <section className="flex flex-row items-center space-x-1 mr-4">
      <SiteIcon name={site.domain} domain={site.domain} />
      <Heading as="h3" className="text-base font-bold">
        {site.domain}
      </Heading>
    </section>
  );
}
