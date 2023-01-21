import { HOME_ORIGIN } from '@chirpy-dev/utils';
import * as React from 'react';

import { Button, Card, Heading, Link, Text } from '../../components';
import { useCurrentUser } from '../../contexts';
import { useCelebration } from '../../hooks';
import { AppLayout } from './components/app-layout';

export function Welcome(): JSX.Element {
  useCelebration('isNewUser');
  const { data, loading } = useCurrentUser();
  const [isValidProfile, setIsValidProfile] = React.useState(true);
  React.useEffect(() => {
    if (!data.id) {
      return;
    }
    if (data.name) {
      setIsValidProfile(true);
    } else {
      setIsValidProfile(false);
    }
  }, [data, loading]);
  return (
    <AppLayout title="Welcome">
      <div className="flex h-full items-center justify-center">
        <Card className="flex w-fit flex-col items-center justify-center space-y-12 py-6 px-4">
          <div className="space-y-2 text-center">
            <Heading as="h2" className="!tracking-tight">
              Welcome on board 🎉
            </Heading>
            <Text variant="secondary">
              {isValidProfile
                ? `Feel free to create a site, and publish your content.`
                : `You profile is incomplete, you can update it in the profile page.`}
            </Text>
          </div>
          <div className="space-x-4">
            <Button variant="solid" color="primary">
              <Link href="/" variant="plain">
                Dashboard
              </Link>
            </Button>
            <Button color="gray">
              {isValidProfile ? (
                <Link href={`${HOME_ORIGIN}/docs`} variant="plain">
                  Docs
                </Link>
              ) : (
                <Link href="/profile" variant="plain">
                  My profile
                </Link>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
