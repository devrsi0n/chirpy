import FacebookLogo from 'super-tiny-icons/images/svg/facebook.svg';
import GitHubLogo from 'super-tiny-icons/images/svg/github.svg';
import GoogleLogo from 'super-tiny-icons/images/svg/google.svg';
import MicrosoftLogo from 'super-tiny-icons/images/svg/microsoft.svg';
import TwitterLogo from 'super-tiny-icons/images/svg/twitter.svg';

export type AuthOption = {
  name: string;
  icon: React.FC;
};

export const authOptions: AuthOption[] = [
  {
    name: 'Google',
    icon: getLogoComponent(GoogleLogo, 'google', 26),
  },
  {
    name: 'Facebook',
    icon: getLogoComponent(FacebookLogo, 'facebook', 24),
  },
  {
    name: 'Microsoft',
    icon: getLogoComponent(MicrosoftLogo, 'microsoft', 27),
  },
  {
    name: 'Twitter',
    icon: getLogoComponent(TwitterLogo, 'twitter', 24),
  },
  {
    name: 'GitHub',
    icon: getLogoComponent(GitHubLogo, 'github', 24),
  },
];

function getLogoComponent(data: StaticImageData, brand: string, size: number) {
  return function Logo() {
    return <img src={data.src} width={size} height={size} alt={`Logo of ${brand}`} />;
  };
}
