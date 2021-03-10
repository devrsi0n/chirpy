import passport, { Profile } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { NextApiRequest, NextApiResponse } from 'next';
import { CookieSerializeOptions, serialize } from 'cookie';
import superjson from 'superjson';

import { AUTH_COOKIE_NAME, USER_COOKIE_NAME } from 'shared/constants';
import { createToken } from '../utilities/create-token';
import { redirect } from '../response';
import { getFirstQueryParam } from '../utilities/url';
import { getAdminApollo } from '$server/common/admin-apollo';

import { AccountProvider_Enum, UserType_Enum } from '$server/graphql/generated/types';
import { UpsertUserDocument } from '$server/graphql/generated/user';
import { UserByPkDocument } from '$server/graphql/generated/user';

interface User {
  id: string;
}

passport.serializeUser<User, string>((user, done) => {
  done(null, user.id);
});

passport.deserializeUser<User, string>((id, done) => {
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
      done(null, user as User);
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
    async (accessToken, refreshToken, profile, cb) => {
      const user = await getUserByProviderProfile(profile, AccountProvider_Enum.Google);
      cb(undefined, user);
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
      const user = await getUserByProviderProfile(profile, AccountProvider_Enum.GitHub);
      cb(null, user);
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
  const { displayName, username, id: providerAccountId } = profile;
  if (!username) {
    throw new Error(`Expect a valid username, get ${username}`);
  }
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
  const maxAge = 60 * 60 * 24;
  const authToken = createToken(
    {
      userId: id,
      name,
      email,
    },
    { maxAge, allowedRoles: ['user'], defaultRole: 'user', role: 'user' },
  );
  const cookieOptions = getCookieOptions(maxAge);
  const authCookie = serialize(AUTH_COOKIE_NAME, authToken, cookieOptions);
  const userIdCookie = serialize(
    USER_COOKIE_NAME,
    Buffer.from(id).toString('base64'),
    cookieOptions,
  );
  res.setHeader('Set-Cookie', [authCookie, userIdCookie]);
  const redirectURL = getFirstQueryParam(req.query, 'redirectURL');
  redirect(res, redirectURL || '/');
}

export async function handleLogout(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const cookieOptions = getCookieOptions(-1);
  const authCookie = serialize(AUTH_COOKIE_NAME, '', cookieOptions);
  const userIdCookie = serialize(USER_COOKIE_NAME, '', cookieOptions);

  res.setHeader('Set-Cookie', [authCookie, userIdCookie]);
  const redirectURL = getFirstQueryParam(req.query, 'redirectURL');
  redirect(res, redirectURL || '/');
}
