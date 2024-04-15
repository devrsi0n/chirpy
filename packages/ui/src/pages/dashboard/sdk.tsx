import { trpc } from '@chirpy-dev/trpc/src/client';
import { useSession } from 'next-auth/react';

import { SettingsCard } from '../../blocks';
import { Button, IconRefreshCw, Spinner, useToast } from '../../components';
import { MUTATION_ERROR } from '../../strings';
import { logger } from '../../utilities';

type SDKForm = {
  sdkKey: string;
};
export function SDK(props: SDKForm) {
  const { showToast } = useToast();
  const { mutateAsync: generateKey, isLoading } =
    trpc.settings.generateKey.useMutation();
  const { data: session } = useSession();

  const handleRegenerate = async () => {
    try {
      await generateKey();
    } catch (error) {
      logger.error(`Generate SDK key failed`, error as Error);
      showToast({
        type: 'error',
        title: MUTATION_ERROR,
      });
      throw error;
    }
  };
  return (
    <SettingsCard>
      <SettingsCard.Header className="flex items-center gap-4">
        <span>Chirpy SDK</span>
        <span className="select-none rounded-md border border-primary-700 px-2 py-1 text-xs font-medium text-primary-1000 first-letter:uppercase">
          {`Pro+ Only`}
        </span>
      </SettingsCard.Header>
      <SettingsCard.Body>
        <p className="-mt-2 text-sm">
          Integrate Chirpy API into your services. e.g. create projects, fetch
          comments
        </p>
        <h4 className="text-lg font-semibold">Server API key</h4>
        <div className="flex gap-2">
          <p
            className="rounded border p-2 text-base text-gray-1000"
            onClick={async () => {
              if (!props.sdkKey) {
                console.error(`No SDK key found`);
                return;
              }
              await navigator.clipboard.writeText(props.sdkKey);
              showToast({
                title: 'The API key is copied',
                type: 'success',
              });
            }}
          >
            {props.sdkKey || 'Click to generate ->'}
          </p>
          <Button
            disabled={
              !['ENTERPRISE', 'PRO'].includes(session?.user?.plan || '') ||
              isLoading
            }
            variant="text"
            onClick={handleRegenerate}
            aria-label="Regenerate API key"
          >
            {isLoading ? (
              <Spinner className="!text-gray-100">Generating</Spinner>
            ) : (
              <IconRefreshCw size={16} />
            )}
          </Button>
        </div>
      </SettingsCard.Body>
    </SettingsCard>
  );
}
