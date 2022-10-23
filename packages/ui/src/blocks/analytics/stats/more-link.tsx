// import React from 'react';

// import { Link } from '../../../components';

import { Site } from '../type';

export type MoreLinkProps = {
  url?: string;
  site?: Site;
  endpoint?: string;
  list: any[];
};

export default function MoreLink({
  url,
  site,
  list,
  endpoint,
}: MoreLinkProps): JSX.Element | null {
  // if (list.length > 0) {
  //   return (
  //     <div className="text-center w-full py-3 md:pb-3 md:pt-0 md:absolute md:bottom-0 md:left-0">
  //       <Link
  //         disabled
  //         href={url || `/${encodeURIComponent(site.domain)}/${endpoint}${window.location.search}`}
  //         className="leading-snug font-bold text-sm text-gray-1000 hover:text-blue-900 transition tracking-wide"
  //         variant="plain"
  //       >
  //         <svg
  //           className="feather mr-1"
  //           style={{ marginTop: '-2px' }}
  //           xmlns="http://www.w3.org/2000/svg"
  //           viewBox="0 0 24 24"
  //           width="24"
  //           fill="none"
  //           stroke="currentColor"
  //           strokeWidth="2"
  //           strokeLinecap="round"
  //           strokeLinejoin="round"
  //         >
  //           {/* eslint-disable-next-line max-len */}
  //           <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
  //         </svg>
  //         <span>DETAILS</span>
  //       </Link>
  //     </div>
  //   );
  // }
  return null;
}
