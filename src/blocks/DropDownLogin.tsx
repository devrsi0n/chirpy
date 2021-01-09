import * as React from 'react';
import { useRouter } from 'next/router';

import { DropDownMenu } from '$/components/Button';
import { GoogleIcon } from '$/components/Icons';
import { GitHubIcon } from '$/components/Icons';

export type DropDownLoginProps = {
  //
};

export function DropDownLogin(props: DropDownLoginProps): JSX.Element {
  const router = useRouter();
  const handleClickGitHub = React.useCallback(() => {
    const url = new URL('/api/auth/github', process.env.NEXT_PUBLIC_APP_URL);
    url.searchParams.set('redirectURL', window.location.href);
    router.push(url.toString());
  }, [router]);
  return (
    <DropDownMenu content="Login">
      <DropDownMenu.Item
        className="flex flex-row justify-end space-x-4"
        onClick={() => console.log('click google')}
      >
        <GoogleIcon width={20} height={20} />
        <span>Google</span>
      </DropDownMenu.Item>
      <DropDownMenu.Item
        className="flex flex-row justify-end space-x-4"
        onClick={handleClickGitHub}
      >
        <GitHubIcon width={18} height={18} />
        <span>GitHub</span>
      </DropDownMenu.Item>
    </DropDownMenu>
  );
}
