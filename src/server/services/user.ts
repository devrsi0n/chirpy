import { Profile as AuthProfile } from 'next-auth';

import { UpdateUserByPkDocument } from '$/server/graphql/generated/user';

import { getAdminApollo } from '../common/admin-apollo';

export async function fillUserFields(user: User, profile: Profile, provider: Provider) {
  const client = getAdminApollo();
  try {
    await client.mutate({
      mutation: UpdateUserByPkDocument,
      variables: {
        id: user.id,
        ...translatorMap[provider](profile),
      },
    });
  } catch (error) {
    console.log('fill user fields failed', error);
  }
}

const translatorMap: Record<Provider, typeof translateGithubProfile> = {
  github: translateGithubProfile,
};

function translateGithubProfile(profile: Profile) {
  return {
    website: profile.blog,
    bio: profile.bio,
    twitterUserName: profile.twitter_username,
  };
}

type User = {
  name: string;
  image: string;
  email: string | null;
  emailVerified: boolean | null;
  id: number;
  createdAt: string;
  updatedAt: string;
};

interface Profile extends AuthProfile {
  blog: string;
  bio: string;
  twitter_username: string;
}

type Provider = 'github';
