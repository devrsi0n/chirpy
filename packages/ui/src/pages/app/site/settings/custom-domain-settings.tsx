import * as React from 'react';

import {
  Button,
  IconLoader,
  TextField,
  useToast,
} from '../../../../components';
import { useForm } from '../../../../hooks';
import {
  isTRPCClientError,
  RouterOutputs,
  trpcClient,
} from '../../../../utilities';
import { CustomDomainCard } from './custom-domain-card';

export type CustomDomainSettingsProps = {
  siteId: string;
  data?: RouterOutputs['site']['byId'];
};

export function CustomDomainSettings(
  props: CustomDomainSettingsProps,
): JSX.Element {
  const { register, hasError, handleSubmit, setFields } = useForm({
    defaultValues: {
      customDomain: '',
    },
  });
  React.useEffect(() => {
    if (props.data?.customDomain) {
      setFields({
        customDomain: props.data.customDomain,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data?.customDomain]);
  const { mutateAsync: createDomain, isLoading } =
    trpcClient.site.createDomain.useMutation();
  const trpcCtx = trpcClient.useContext();
  const { showToast } = useToast();
  const handleClickSubmit = handleSubmit(async (fields) => {
    try {
      await createDomain({
        siteId: props.siteId,
        customDomain: fields.customDomain || '',
      });
      trpcCtx.site.byId.invalidate(props.siteId);
      showToast({
        title: 'Custom domain added successfully!',
        type: 'success',
      });
    } catch (error) {
      if (isTRPCClientError(error)) {
        switch (error.data?.code) {
          case 'FORBIDDEN': {
            showToast({
              title: 'Domain is in-use',
              description:
                'Domain is already owned by another team but you can request delegation to access it',
              type: 'error',
            });

            break;
          }
          case 'CONFLICT': {
            showToast({
              title: 'Invalid domain',
              description:
                'Domain is already being used by a different project',
              type: 'error',
            });

            break;
          }
          case 'INTERNAL_SERVER_ERROR': {
            showToast({
              title: 'Server error',
              description: 'Internal server error, please try again later',
              type: 'error',
            });

            break;
          }
          // No default
        }
      }
      throw error;
    }
  });
  if (props.data?.customDomain) {
    return <CustomDomainCard data={props.data} />;
  }
  return (
    <section className="pt-8">
      <TextField
        {...register('customDomain')}
        label="Custom domain"
        prefix="https://"
      />
      <Button
        className="w-full sm:w-auto"
        disabled={hasError || isLoading}
        color="primary"
        variant="solid"
        onClick={handleClickSubmit}
      >
        {isLoading && <IconLoader className="animate-spin text-white" />}
        <span>Save</span>
      </Button>
    </section>
  );
}
