import clsx from 'clsx';
import { signIn } from 'next-auth/react';
import * as React from 'react';

import { CompanyRight } from '../../../../../blocks/footer';
import { Alert } from '../../../../../components/alert';
import { Button } from '../../../../../components/button';
import { Divider } from '../../../../../components/divider';
import { Heading } from '../../../../../components/heading';
import { Link } from '../../../../../components/link';
import { Logo } from '../../../../../components/logo';
import { Text } from '../../../../../components/text';
import { Toggle } from '../../../../../components/toggle';
import { SIGN_IN_ERRORS } from '../../../../../strings';
import { AnonymousUserSignIn } from './anonymous-user-sign-in';
import { EmailSignIn } from './email-sign-in';
import styles from './sign-in-form.module.scss';
import { useSocialAuthOptions } from './use-social-auth-options';

export type SignInFormProps = React.PropsWithChildren<{
  title: string;
  subtitle?: string;
  /**
   * @default false allow anonymous sign-in
   */
  allowAnonymous?: boolean;
}>;

type SignInErrorKeys = keyof typeof SIGN_IN_ERRORS;

export function SignInForm({
  title,
  subtitle,
  allowAnonymous,
}: SignInFormProps): JSX.Element {
  const [errorType, setErrorType] = React.useState<SignInErrorKeys | null>(
    null,
  );
  React.useEffect(() => {
    const error = new URLSearchParams(location.search).get(
      'error',
    ) as SignInErrorKeys | null;
    if (error) {
      setErrorType(error);
    }
  }, []);
  const error =
    errorType && (SIGN_IN_ERRORS[errorType] ?? SIGN_IN_ERRORS.Default);

  const [isAnonymous, setIsAnonymous] = React.useState(true);
  const alert = React.useMemo(
    () =>
      error && (
        <Alert
          key="alert"
          onClickDismiss={() => setErrorType(null)}
          type="warn"
          title={error}
          styles={{
            root: 'mb-1 py-2 px-4',
            // Force row direction
            container: '!space-x-2 !flex-row !space-y-0',
            dismissButton: 'mt-0.5',
          }}
          align="center"
        />
      ),
    [error],
  );
  const authOptions = useSocialAuthOptions();
  return (
    <div className="full-bleed flex h-full flex-row">
      <div className="flex h-full flex-1 flex-col items-center ">
        <div className="mt-8 ml-0 self-start justify-self-end sm:ml-8">
          <Logo size="lg" hideSpacing />
        </div>
        <div className="flex h-full w-full flex-col justify-center space-y-8 py-7 sm:mx-2 sm:w-64 md:w-96">
          <div className="space-y-3">
            <Heading as="h2" className="mt-5 font-bold">
              {title}
            </Heading>
            <Text variant="secondary">{subtitle}</Text>
          </div>
          <div className="space-y-6">
            <div>
              {allowAnonymous && isAnonymous ? (
                <AnonymousUserSignIn>{alert}</AnonymousUserSignIn>
              ) : (
                <EmailSignIn>{alert}</EmailSignIn>
              )}
              {allowAnonymous && (
                <Toggle
                  checked={isAnonymous}
                  onChange={(value) => setIsAnonymous(value)}
                  label="Anonymous"
                  reverse
                  className="mt-6"
                  hintText="Turn off to sign in with your email if you want to sign-in with another browser later."
                />
              )}
            </div>
            {authOptions && (
              <>
                <Divider variant="text">OR</Divider>
                <div className="space-y-3">
                  {authOptions?.map((option) => (
                    <Button
                      key={option.name}
                      onClick={() =>
                        signIn(option.name.toLowerCase(), {
                          callbackUrl: `${location.origin}/redirecting`,
                        })
                      }
                      className="w-full px-0 md:justify-start md:pl-20"
                      size="lg"
                      disabled={!!process.env.NEXT_PUBLIC_MAINTENANCE_MODE}
                    >
                      <option.icon />
                      <span className="ml-2 text-left">
                        Sign in with {option.name}
                      </span>
                    </Button>
                  ))}
                </div>
              </>
            )}
          </div>
          <Text className="py-3" size="sm" variant="secondary">
            {`By clicking the buttons above, you acknowledge that you have read
            and understood, and agree to Chirpy's `}
            <Link origin="home" href="/terms-of-service">
              Terms of Service
            </Link>
            {' and '}
            <Link origin="home" href="/privacy-policy">
              Privacy Policy
            </Link>
            .
          </Text>
        </div>
        <div className="mb-8 ml-0 self-start justify-self-end sm:ml-8">
          <CompanyRight />
        </div>
      </div>
      <div
        className={clsx(
          `hidden h-[100vh] min-h-[200px] w-full flex-1 bg-cover sm:block`,
          styles.mainImage,
        )}
      ></div>
    </div>
  );
}
