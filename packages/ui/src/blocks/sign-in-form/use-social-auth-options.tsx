import { getProviders } from 'next-auth/react';
import { StaticImageData } from 'next/image';
import DiscordLogo from 'super-tiny-icons/images/svg/discord.svg';
import GitHubLogo from 'super-tiny-icons/images/svg/github.svg';
import GoogleLogo from 'super-tiny-icons/images/svg/google.svg';
import TwitterLogo from 'super-tiny-icons/images/svg/twitter.svg';

import { useAsync } from '../../hooks/use-async';

// import FacebookLogo from 'super-tiny-icons/images/svg/facebook.svg';

export function useSocialAuthOptions(): null | AuthOption[] {
  const { data } = useAsync(getProviders, true);
  if (!data) {
    return null;
  }
  return Object.values(data)
    .map((val) => {
      const option = AUTH_OPTIONS[val.id as SupportedProviders];
      if (!option) {
        return false;
      }
      return option;
    })
    .filter(Boolean) as AuthOption[];
}

export type AuthOption = {
  name: string;
  icon: React.FC;
};

export type SupportedProviders = 'twitter' | 'google' | 'github' | 'discord';

const AUTH_OPTIONS: Record<SupportedProviders, AuthOption> = {
  google: getAuthOption(GoogleLogo, 'Google', 24),
  // TODO: add back facebook login once we can delete user account.
  // {
  //   name: 'Facebook',
  //   icon: getLogoComponent(FacebookLogo, 'facebook', 24),
  // },
  twitter: getAuthOption(TwitterLogo, 'Twitter', 24),
  github: getAuthOption(GitHubLogo, 'GitHub', 24),
  discord: getAuthOption(DiscordLogo, 'Discord', 24),
};

function getAuthOption(data: StaticImageData, brand: string, size: number) {
  return {
    name: brand,
    icon: function SocialLogo() {
      return (
        <img
          src={data.src}
          width={size}
          height={size}
          alt={`Logo of ${brand}`}
        />
      );
    },
  };
}
