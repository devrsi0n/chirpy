import * as React from 'react';
import { Text } from '../../components/Text';

// interface ITestCommentProps {}

const pid = 'ckiv74dj00009w0cvarpb3s62';
const appNameLowerCase = process.env.NEXT_PUBLIC_APP_NAME.toLowerCase();

export default function TestingComment(/*props: ITestCommentProps*/): JSX.Element {
  React.useEffect(() => {
    const commentScript = document.querySelector(`[data-${appNameLowerCase}-pid=${pid}]`);
    if (!commentScript) {
      const script = document.createElement('script');
      script.src = '/comment.js';
      script.setAttribute(`data-${appNameLowerCase}-pid`, pid);

      document.body.appendChild(script);
    }
  }, []);
  return (
    <div>
      <Text>Test comments:</Text>
      <div
        {...{
          [`data-${appNameLowerCase}-comment`]: 'true',
        }}
      ></div>
    </div>
  );
}
