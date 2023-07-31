import {
  RouterOutputs,
  trpc,
  TRPCClientError,
} from '@chirpy-dev/trpc/src/client';
import * as React from 'react';

import { SettingsCard } from '../../../blocks';
import {
  Button,
  Link,
  Spinner,
  Text,
  TextField,
  useToast,
} from '../../../components';
import { MUTATION_ERROR } from '../../../strings';
import { logger } from '../../../utilities';

export type PageUrlProps = Pick<
  NonNullable<RouterOutputs['project']['byDomain']>,
  'id' | 'queryParameters' | 'domain'
> & {
  username: string;
};

export function PageIdentifier(props: PageUrlProps): JSX.Element {
  const [parameter, setParameter] = React.useState(props.queryParameters || '');
  const [error, setError] = React.useState('');
  const { mutateAsync, isLoading } = trpc.project.update.useMutation();
  const { showToast } = useToast();
  const { mutateAsync: revalidate } = trpc.revalidate.url.useMutation();
  const handleSaveQueryParameters = async () => {
    try {
      await mutateAsync({
        projectId: props.id,
        queryParameters: parameter,
        domain: props.domain,
      });
      setError('');
      showToast({
        type: 'success',
        title: 'Page identifier updated',
      });
      void revalidate({
        url: `/dashboard/${props.username}/${props.domain}/settings`,
      });
    } catch (error) {
      if (
        error instanceof TRPCClientError &&
        error.data.code === 'BAD_REQUEST'
      ) {
        setError(
          'Invalid query parameters, only letters, numbers, - and _ allowed',
        );
        return;
      }
      showToast({
        type: 'error',
        title: MUTATION_ERROR,
      });
      logger.error('Update page identifier failed', error as Error);
    }
  };
  return (
    <SettingsCard>
      <SettingsCard.Header>Page identifier</SettingsCard.Header>
      <SettingsCard.Body>
        <Text variant="secondary">
          {`Chirpy uses the URL domain + path of your page as the identifier by default, if you want to add `}
          <Link
            variant="primary"
            href="https://en.wikipedia.org/wiki/Query_string"
          >
            {`query parameters`}
          </Link>
          {` as the identifier, please specify them below.`}
        </Text>
        <div className="pt-6">
          <TextField
            value={parameter}
            onChange={(e) => {
              setParameter(e.target.value);
              setError('');
            }}
            className="w-full"
            name="pageQueryParameters"
            label="Query parameters"
            hintText="Multiple parameters must be separated by commas"
            placeholder="id,name"
            errorMessage={error}
          />
        </div>
      </SettingsCard.Body>
      <SettingsCard.Footer>
        <Button
          color="primary"
          variant="solid"
          onClick={handleSaveQueryParameters}
          disabled={!!process.env.NEXT_PUBLIC_MAINTENANCE_MODE}
        >
          {isLoading ? (
            <Spinner className="!text-gray-100">Save</Spinner>
          ) : (
            'Save'
          )}
        </Button>
      </SettingsCard.Footer>
    </SettingsCard>
  );
}
