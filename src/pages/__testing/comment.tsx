import * as React from 'react';
import { Text } from '../../components/Text';

// interface ITestCommentProps {}

const pid = '2636fc3e-4977-4cee-99fb-5d3111e64df5';
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
      <Text className="text-center">Test comments:</Text>
      <div
        {...{
          [`data-${appNameLowerCase}-comment`]: 'true',
        }}
      ></div>
      <footer className="text-center">This is the bottom of this page.</footer>
    </div>
  );
}
