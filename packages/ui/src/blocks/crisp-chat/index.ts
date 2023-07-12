import dynamic from 'next/dynamic';

export const CrispChatWithoutSSR = dynamic(
  () => import('./crisp-chat').then((mod) => mod.CrispChat),
  { ssr: false },
);
