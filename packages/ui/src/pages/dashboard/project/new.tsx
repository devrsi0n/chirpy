import { trpc } from '@chirpy-dev/trpc/src/client';
import { useRouter } from 'next/router';

import { useToast } from '../../../components';
import { useCurrentUser } from '../../../contexts';
import { MUTATION_ERROR } from '../../../strings';
import { logger } from '../../../utilities/logger';
import { CreateProject } from '../../new';

export function New(): JSX.Element {
  const router = useRouter();
  const { mutateAsync: createAProject } = trpc.project.create.useMutation();
  const { mutateAsync: revalidate } = trpc.revalidate.url.useMutation();
  const { showToast } = useToast();
  const { data } = useCurrentUser();
  return (
    <CreateProject
      onSubmit={async (fields) => {
        try {
          await createAProject({
            // TODO: Team id?
            ...fields,
          });
          await revalidate({
            url: `/dashboard/${data?.username}`,
          });
          router.push(
            `/dashboard/${data?.username}/${fields.domain}/get-started`,
          );
        } catch (error: unknown) {
          logger.error('Create project failed', error as Error);
          showToast({
            type: 'error',
            title: `Create project failed`,
            description: MUTATION_ERROR,
          });
          throw error;
        }
      }}
    />
  );
}
