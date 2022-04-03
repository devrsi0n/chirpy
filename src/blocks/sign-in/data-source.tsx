import GitHubLogo from 'super-tiny-icons/images/svg/github.svg';
import TwitterLogo from 'super-tiny-icons/images/svg/twitter.svg';

// import FacebookLogo from 'super-tiny-icons/images/svg/facebook.svg';
// import GoogleLogo from 'super-tiny-icons/images/svg/google.svg';

export type AuthOption = {
  name: string;
  icon: React.FC;
};

export const authOptions: AuthOption[] = [
  // TODO: Apply google sign in verification
  // {
  //   name: 'Google',
  //   icon: getLogoComponent(GoogleLogo, 'google', 26),
  // },
  // TODO: add back facebook login once we can delete user account.
  // {
  //   name: 'Facebook',
  //   icon: getLogoComponent(FacebookLogo, 'facebook', 24),
  // },
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
