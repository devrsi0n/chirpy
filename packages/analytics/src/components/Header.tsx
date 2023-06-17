/* eslint-disable @next/next/no-img-element */

import CurrentVisitors from './CurrentVisitors';
import DateFilter from './DateFilter';
import { useAnalytics } from './Provider';

export default function Header() {
  const { domain } = useAnalytics();
  return (
    <header className="flex flex-col justify-between gap-6 lg:flex-row">
      <div className="flex justify-between gap-2 md:justify-start md:gap-10">
        <h1 className="flex min-w-max items-center gap-2">
          <img
            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
            alt={`${domain} logo`}
            width={32}
            height={32}
            loading="lazy"
          />
          <span className="text-lg leading-6 text-gray-1100">{domain}</span>
        </h1>
        <CurrentVisitors />
      </div>
      <DateFilter />
    </header>
  );
}
