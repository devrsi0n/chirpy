import FacebookLogo from 'super-tiny-icons/images/svg/facebook.svg';
import GitHubLogo from 'super-tiny-icons/images/svg/github.svg';
import GoogleLogo from 'super-tiny-icons/images/svg/google.svg';
import MicrosoftLogo from 'super-tiny-icons/images/svg/microsoft.svg';
import TwitterLogo from 'super-tiny-icons/images/svg/twitter.svg';

export type AuthOption = {
  name: string;
  href: string;
  icon: React.FC;
};

export const authOptions: AuthOption[] = [
  {
    name: 'Google',
    icon: getLogoComponent(GoogleLogo, 'google', 26),
    href: '/api/auth/google',
  },
  {
    name: 'Facebook',
    icon: getLogoComponent(FacebookLogo, 'facebook', 24),
    href: '/api/auth/facebook',
  },
  {
    name: 'Microsoft',
    icon: getLogoComponent(MicrosoftLogo, 'microsoft', 27),
    href: '/api/auth/microsoft',
  },
  {
    name: 'Twitter',
    icon: getLogoComponent(TwitterLogo, 'twitter', 24),
    href: '/api/auth/twitter',
  },
  {
    name: 'GitHub',
    icon: getLogoComponent(GitHubLogo, 'github', 24),
    href: '/api/auth/github',
  },
];

function getLogoComponent(data: StaticImageData, brand: string, size: number) {
  return function Logo() {
    return <img src={data.src} width={size} height={size} alt={`Logo of ${brand}`} />;
  };
}
