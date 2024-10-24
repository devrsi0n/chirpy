import { Button, Heading, Link, Text, useCelebration } from '@chirpy-dev/ui';
import * as React from 'react';

import { ConfirmUserFields } from '$/components/confirm-user-fields';
import { useCurrentUser } from '$/contexts';
import { hasValidUserProfile } from '$/utilities/user';
import { SiteLayout } from '../../components/layout';

// export type WelcomeProps = React.PropsWithChildren<{}>;

export default function Welcome(/*props: WelcomeProps*/): JSX.Element {
  useCelebration('isNewUser');
  const { data, loading } = useCurrentUser();
  const [isFullFilled, setIsFullFilled] = React.useState(false);
  React.useEffect(() => {
    setIsFullFilled(isProfileFullFilled());
  }, []);

  React.useEffect(() => {
    if (loading) return;
    if (hasValidUserProfile(data)) {
      setIsFullFilled(true);
    } else {
      setIsFullFilled(false);
    }
  }, [data, loading]);
  return (
    <SiteLayout title="Welcome">
      {isFullFilled ? <FullFilled /> : <NotFullFilled />}
    </SiteLayout>
  );
}

function FullFilled(): JSX.Element {
  const { data } = useCurrentUser();
  return (
    <section className="flex flex-col items-center justify-center space-y-12">
      <div className="space-y-2 text-center">
        <Heading as="h2" className="!tracking-tight">
          Welcome on board 🎉
        </Heading>
        <Text variant="secondary">
          Feel free to create a project, integrate a widget in your site, or
          just explore!
        </Text>
      </div>
      <div className="space-x-4">
        <Button variant="solid" color="primary">
          <Link href={`/dashboard/${data.username}`} variant="plain">
            Dashboard
          </Link>
        </Button>
        <Button color="gray">
          <Link href="/docs" variant="plain">
            Docs
          </Link>
        </Button>
      </div>
    </section>
  );
}

function NotFullFilled() {
  return (
    <div className="flex flex-col items-center space-y-8 md:flex-row md:items-center md:space-x-8 md:space-y-0">
      <div className="space-y-3">
        <Heading as="h2" className="!tracking-tight">
          Welcome on board
        </Heading>
        <Text variant="secondary">Just fill this form to get started</Text>
      </div>
      <ConfirmUserFields />
    </div>
  );
}

function isProfileFullFilled(): boolean {
  return !location.search.includes('invalidProfile=true');
}
