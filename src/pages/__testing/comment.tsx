import Head from 'next/head';
import * as React from 'react';

import { Text } from '../../components/Text';

// interface ITestCommentProps {}

const pid = '46f49778-ed0f-4a5a-a244-80395eeb3a8d';
const appNameLowerCase = process.env.NEXT_PUBLIC_APP_NAME.toLowerCase();

export default function TestingComment(/*props: ITestCommentProps*/): JSX.Element {
  React.useEffect(() => {
    const commentScript = document.querySelector(`[data-${appNameLowerCase}-pid='${pid}']`);
    if (!commentScript) {
      const script = document.createElement('script');
      script.src = '/comment.js';
      script.setAttribute(`data-${appNameLowerCase}-pid`, pid);

      document.body.append(script);
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Testing Comment</title>
      </Head>
      <Text tw="text-center">Test comments:</Text>
      <div
        {...{
          [`data-${appNameLowerCase}-comment`]: 'true',
        }}
      ></div>
      <footer tw="text-center">This is the bottom of this page.</footer>
    </div>
  );
}
