/* eslint-disable @next/next/no-img-element */

import useDomain from '../lib/hooks/use-domain';
import CurrentVisitors from './CurrentVisitors';
import DateFilter from './DateFilter';

export default function Header() {
  const { domain, logo, handleLogoError } = useDomain();

  return (
    <header className="flex flex-col justify-between gap-6 lg:flex-row">
      <div className="flex justify-between gap-2 md:justify-start md:gap-10">
        <h1 className="flex min-w-max items-center gap-2">
          <img
            src={logo}
            alt=""
            width={16}
            height={16}
            onError={handleLogoError}
            loading="lazy"
          />
          <span className="text-lg leading-6">{domain}</span>
        </h1>
        <CurrentVisitors />
      </div>
      <DateFilter />
    </header>
  );
}
