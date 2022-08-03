import { Profile as AuthProfile } from 'next-auth';

import {
  UpdateUserByPkDocument,
  UserBeforeUpdateDocument,
} from '$/server/graphql/generated/user';

import { mutate, query } from '../common/gql';

export async function fillUserFields(
  user: User,
  profile?: GitHubProfile,
  provider?: Provider,
): Promise<void> {
  if (
    (user.username && user.bio && user.website && user.twitterUserName) ||
    !provider
  ) {
    return;
  }
  try {
    const fields = translatorMap[provider]?.(profile);
    if (!fields) {
      return;
    }
    const { __typename, ...existsUser } = await query(
      UserBeforeUpdateDocument,
      {
        id: user.id,
      },
      'userByPk',
    );
    await mutate(
      UpdateUserByPkDocument,
      {
        // Preset the existing fields or they'll be reset
        ...existsUser,
        ...fields,
        id: user.id,
      },
      'updateUserByPk',
    );

    return;
  } catch (error) {
    console.error('fill user fields failed', error);
    return;
  }
}

const translatorMap: Record<Provider, typeof translateGithubProfile> = {
  github: translateGithubProfile,
};

function translateGithubProfile(profile?: GitHubProfile) {
  if (
    !profile ||
    (!profile.login &&
      !profile.bio &&
      !profile.blog &&
      !profile.twitter_username)
  ) {
    return null;
  }
  return {
    username: profile.login,
    website: profile.blog,
    bio: profile.bio,
    twitterUserName: profile.twitter_username,
  };
}

type User = {
  name: string;
  username: string;
  image: string;
  email: string | null;
  emailVerified: boolean | null;
  id: string;
  bio: string;
  website: string;
  twitterUserName: string;
};

interface GitHubProfile extends AuthProfile {
  login: string;
  blog: string;
  bio: string;
  twitter_username: string;
}

type Provider = 'github';
