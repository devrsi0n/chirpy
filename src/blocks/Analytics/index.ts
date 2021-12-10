import dynamic from 'next/dynamic';

const Realtime = dynamic(() => import(/* webpackChunkName: "analytics-realtime"*/ './analytics'), {
  ssr: false,
});
export { Realtime };
