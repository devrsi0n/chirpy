import { trpc } from '@chirpy-dev/trpc/src/client';
import { CALLBACK_URL_KEY, SIGN_IN_SUCCESS_KEY } from '@chirpy-dev/utils';
import { useRouter } from 'next/router';
import * as React from 'react';

import { SiteLayout } from '../../blocks';
import { Spinner, useToast } from '../../components';
import { useCurrentUser } from '../../contexts';
import { useTimeout } from '../../hooks';
import { MUTATION_ERROR } from '../../strings';
import { hasValidUserProfile, logger } from '../../utilities';
import { useOnboardingProject } from '../new';

export function Redirecting(): JSX.Element {
  const { data } = useCurrentUser();
  const router = useRouter();
  const [savedFields, _, removeSavedFields] = useOnboardingProject();
  const { mutateAsync: createAProject } = trpc.project.create.useMutation();
  const { showToast } = useToast();
  const isCreatingProjectRef = React.useRef(false);
  React.useEffect(() => {
    if (!data.id) {
      return;
    }

    if (localStorage.getItem(SIGN_IN_SUCCESS_KEY) !== 'true') {
      localStorage.setItem(SIGN_IN_SUCCESS_KEY, 'true');
    }
    if (!hasValidUserProfile(data)) {
      router.push('/profile?invalid=true');
    } else if (savedFields?.domain) {
      async function create() {
        if (isCreatingProjectRef.current || !savedFields?.domain) {
          return;
        }
        isCreatingProjectRef.current = true;
        try {
          await createAProject({
            ...savedFields,
          });
          removeSavedFields();
          showToast({
            type: 'success',
            title: `Project created`,
          });
          await router.push(
            `/dashboard/${data.username}/${savedFields.domain}/get-started`,
          );
        } catch (error: unknown) {
          logger.error('Create project failed', error as Error);
          showToast({
            type: 'error',
            title: `Create project failed`,
            description: MUTATION_ERROR,
          });
          await router.push(`/dashboard/project/new`);
        }
      }
      create();
    } else if (data.id) {
      const callbackUrl = sessionStorage.getItem(CALLBACK_URL_KEY);
      sessionStorage.removeItem(CALLBACK_URL_KEY);
      router.push(callbackUrl || `/dashboard/${data.username}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, data.id, savedFields]);
  useTimeout(() => {
    if (!data.id) {
      router.push(
        `/500?message=${encodeURIComponent(
          'User sign-in timeout after 30 seconds',
        )}`,
      );
    }
  }, 30_000);
  return (
    <SiteLayout title="Redirecting">
      <Spinner className="mt-24 justify-center" />
    </SiteLayout>
  );
}
