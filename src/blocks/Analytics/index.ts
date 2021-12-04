import dynamic from 'next/dynamic';

const Realtime = dynamic(() => import(/* webpackChunkName: "analytics-realtime"*/ './realtime'), {
  ssr: false,
});
export { Realtime };
