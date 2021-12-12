import dynamic from 'next/dynamic';

const AnalyticsBlock = dynamic(
  () => import(/* webpackChunkName: "analytics-block"*/ './analytics'),
  {
    ssr: false,
  },
);
export { AnalyticsBlock };
