import clsx from 'clsx';
import { signIn } from 'next-auth/react';
import * as React from 'react';

import { Alert } from '$/components/alert';
import { Button } from '$/components/button';
import { Heading } from '$/components/heading';
import { Link } from '$/components/link';
import { Logo } from '$/components/logo';
import { Text } from '$/components/text';
import { TextField } from '$/components/text-field';
import { useForm } from '$/hooks/use-form';
import { SIGN_IN_ERRORS } from '$/strings';
import { getHostEnv } from '$/utilities/env';

import { authOptions } from './data-source';
import styles from './sign-in.module.scss';

export type SignInProps = React.PropsWithChildren<{
  title: string;
  subtitle?: React.ReactNode;
}>;

type SignInErrorKeys = keyof typeof SIGN_IN_ERRORS;

export function SignIn({ title, subtitle }: SignInProps): JSX.Element {
  const [errorType, setErrorType] = React.useState<
    SignInErrorKeys | undefined
  >();
  React.useEffect(() => {
    const error = new URLSearchParams(location.search).get(
      'error',
    ) as SignInErrorKeys | null;
    if (error) {
      setErrorType(error);
    }
  }, []);
  const [isProd, setIsProd] = React.useState(true);
  React.useEffect(() => {
    if (getHostEnv() !== 'prod') {
      setIsProd(false);
    }
  }, []);
  const error =
    errorType && (SIGN_IN_ERRORS[errorType] ?? SIGN_IN_ERRORS.Default);
  return (
    <div className="full-bleed flex h-full flex-row">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="w-full py-7 sm:mx-2 sm:w-64 md:w-96">
          <div className="pb-8">
            <Logo size="lg" hideSpacing />
          </div>
          <div className="space-y-2">
            <Heading as="h2" className="mt-5 font-black">
              {title}
            </Heading>
            {subtitle}
          </div>
          <div className="mt-8 space-y-2">
            {error && <Alert type="warn">{error}</Alert>}
            {authOptions.map((option) => (
              <Button
                key={option.name}
                onClick={() =>
                  signIn(option.name.toLowerCase(), {
                    callbackUrl: `${location.origin}/auth/redirecting`,
                  })
                }
                className="w-full px-0 md:justify-start md:pl-20"
                size="lg"
              >
                <option.icon />
                <span className="ml-2 text-left">
                  Sign in with {option.name}
                </span>
              </Button>
            ))}
          </div>
          {!isProd && <EmailSignIn />}
          <Text className="py-3" size="sm" variant="secondary">
            By clicking the buttons above, you acknowledge that you have read
            and understood, and agree to Chirpy
            {`'s `}
            <Link href="/terms-of-service">Terms of Service</Link> and{' '}
            <Link href="/privacy-policy">Privacy Policy</Link>.
          </Text>
          {!isProd && <CredentialsSignInForm />}
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

function EmailSignIn(): JSX.Element {
  const [email, setEmail] = React.useState('');
  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setEmail(event.target.value);
  };
  const handleSubmit = () => {
    signIn('email', {
      callbackUrl: `${location.origin}/auth/redirecting`,
      email,
    });
  };
  return (
    <div>
      <TextField
        name="Email"
        type="text"
        label="Email"
        onChange={handleEmailChange}
        className="w-full"
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}

function CredentialsSignInForm(): JSX.Element {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleClickSubmit = handleSubmit<React.FormEvent<HTMLFormElement>>(
    async (fields, event) => {
      event.preventDefault();
      await signIn('credentials', {
        // redirect: false,
        callbackUrl: '/dashboard',
        ...fields,
      });
    },
  );
  return (
    <form onSubmit={handleClickSubmit}>
      <TextField
        {...register('username')}
        type="text"
        label="Username"
        className="w-full"
      />
      <TextField
        {...register('password')}
        type="password"
        label="Password"
        className="w-full"
      />
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}
