import { CookieSerializeOptions, serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';
import passport, { Profile } from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import superjson from 'superjson';

import { getAdminApollo } from '$server/common/admin-apollo';
import { AccountProvider_Enum, UserType_Enum } from '$server/graphql/generated/types';
import { UpsertUserDocument } from '$server/graphql/generated/user';
import { UserByPkDocument } from '$server/graphql/generated/user';
import { isENVDev } from '$server/utilities/env';

import { AUTH_COOKIE_NAME } from '$shared/constants';

import { redirect } from '../response';
import { createAuthToken } from '../utilities/create-token';

passport.serializeUser<string>((user, done) => {
  done(null, user.id);
});

passport.deserializeUser<string>((id, done) => {
  const adminApollo = getAdminApollo();

  adminApollo
    .query({
      query: UserByPkDocument,
      variables: {
        id,
      },
    })
    .then((result) => {
      const { data } = result;
      const user = data.userByPk;
      if (!user) {
        throw new Error(`Get data failed, result: ${superjson.stringify(result)}`);
      }
      done(null, user as Express.User);
    })
    .catch((error) => {
      console.error(`deserializeUser failed: ${error}`);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await getUserByProviderProfile(profile, AccountProvider_Enum.Google);
        done(null, user);
      } catch (error) {
        console.error(`Google auth verify failed: ${error}`);
        done(error);
      }
    },
  ),
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/github/callback`,
      // Get a user's email no matter it's public or not
      scope: ['user:email'],
    },
    async (accessToken: string, refreshToken: string, profile: Profile, cb: $TsFixMe) => {
      try {
        const user = await getUserByProviderProfile(profile, AccountProvider_Enum.GitHub);
        console.log({ user });
        cb(null, user);
      } catch (error) {
        cb(error);
      }
    },
  ),
);

async function getUserByProviderProfile(profile: Profile, provider: AccountProvider_Enum) {
  console.log({ profile });
  if (!profile.emails?.length) {
    throw new Error(`Can't find a valid email`);
  }
  const email = profile.emails[0].value;
  const avatar = profile.photos?.[0].value || '';
  const { displayName, username, id: providerAccountId, name } = profile;
  const adminApollo = getAdminApollo();
  const compoundId = `${provider}:${providerAccountId}`;

  // TODO: Add exception for scenarios: duplicated username
  const user = (
    await adminApollo.mutate({
      mutation: UpsertUserDocument,
      variables: {
        email,
        username,
        displayName,
        familyName: name?.familyName,
        givenName: name?.givenName,
        middleName: name?.middleName,
        avatar,
        userType: UserType_Enum.Free,
        compoundId,
        providerAccountId,
        provider,
      },
    })
  ).data!.insertOneUser!;

  return user;
}

export { passport };

const getCookieOptions = (maxAge: number, httpOnly = false): CookieSerializeOptions => ({
  path: '/',
  httpOnly,
  sameSite: 'lax',
  maxAge,
});

export async function handleSuccessfulLogin(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { id, name, email } = (req as $TsFixMe).user;
  const oneDayInMs = 60 * 60 * 24;
  const maxAge = isENVDev ? oneDayInMs * 365 : oneDayInMs;
  const authToken = createAuthToken(
    {
      userId: id,
      name,
      email,
    },
    { maxAge, allowedRoles: ['user'], defaultRole: 'user', role: 'user' },
  );
  const cookieOptions = getCookieOptions(maxAge);
  const authCookie = serialize(AUTH_COOKIE_NAME, authToken, cookieOptions);
  res.setHeader('Set-Cookie', [authCookie]);
  redirect(res, '/sign-in-success');
}

export async function handleLogout(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const cookieOptions = getCookieOptions(-1);
  const authCookie = serialize(AUTH_COOKIE_NAME, '', cookieOptions);

  res.setHeader('Set-Cookie', [authCookie]);
  // const redirectURL = getFirstQueryParam(req.query, 'redirectURL');
  // redirect(res, redirectURL || '/');
  res.json({
    logout: 'ok',
  });
}
