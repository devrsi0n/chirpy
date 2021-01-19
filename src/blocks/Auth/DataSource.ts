import GitHubLogo from 'super-tiny-icons/images/svg/github.svg';
import GoogleLogo from 'super-tiny-icons/images/svg/google.svg';
import TwitterLogo from 'super-tiny-icons/images/svg/twitter.svg';
import FacebookLogo from 'super-tiny-icons/images/svg/facebook.svg';
import MicrosoftLogo from 'super-tiny-icons/images/svg/microsoft.svg';

export type AuthOption = {
  name: string;
  href: string;
  size: number;
  icon: React.FC<{ width: string; height: string }>;
};

export const authOptions: AuthOption[] = [
  {
    name: 'Google',
    size: 26,
    icon: GoogleLogo,
    href: '/api/auth/google',
  },
  {
    name: 'Facebook',
    size: 24,
    icon: FacebookLogo,
    href: '/api/auth/facebook',
  },
  {
    name: 'Microsoft',
    size: 27,
    icon: MicrosoftLogo,
    href: '/api/auth/microsoft',
  },
  {
    name: 'Twitter',
    size: 24,
    icon: TwitterLogo,
    href: '/api/auth/twitter',
  },
  {
    name: 'GitHub',
    size: 24,
    icon: GitHubLogo,
    href: '/api/auth/github',
  },
];
