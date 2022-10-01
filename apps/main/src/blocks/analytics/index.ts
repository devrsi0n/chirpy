import dynamic from 'next/dynamic';

// TODO: Make it SSR friendly
const AnalyticsBlock = dynamic(
  () => import(/* webpackChunkName: "analytics-block"*/ './analytics'),
  {
    ssr: false,
  },
);
export { AnalyticsBlock };
