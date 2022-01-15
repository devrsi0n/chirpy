import dynamic from 'next/dynamic';

export const LazySiteLayout = dynamic(
  () => import(/* webpackChunkName: "site-layout"*/ './SiteLayout'),
);
