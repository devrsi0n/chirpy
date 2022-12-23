import { ROUTER_ERROR_DUPLICATED_SITE_SUBDOMAIN } from '@chirpy-dev/utils';
import * as React from 'react';

import { Button, IconLoader, useToast } from '../../../../components';
import { useForm } from '../../../../hooks';
import {
  isTRPCClientError,
  RouterOutputs,
  trpcClient,
} from '../../../../utilities';
import { CreateSiteForm } from '../create/create-site-form';

export type SiteGeneralSettingsProps = {
  siteId: string;
  data?: RouterOutputs['site']['byId'];
};

export function SiteGeneralSettings({
  siteId,
  data,
}: SiteGeneralSettingsProps): JSX.Element {
  const { register, setFields, errors, hasError, handleSubmit, setError } =
    useForm({
      defaultValues: {
        name: '',
        description: '',
        subdomain: '',
      },
      resetAfterSubmit: false,
    });
  React.useEffect(() => {
    if (data?.id) {
      setFields({
        name: data.name,
        description: data.description || '',
        subdomain: data.subdomain,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const { mutateAsync: updateSite, isLoading } =
    trpcClient.site.update.useMutation();
  const trpcCtx = trpcClient.useContext();
  const { showToast } = useToast();
  const handleClickSubmit = handleSubmit(async (fields) => {
    try {
      const { ...otherFields } = fields;
      await updateSite({
        id: siteId,
        ...otherFields,
      });
      trpcCtx.site.byId.invalidate(siteId);
      showToast({
        title: 'Update site settings successfully!',
        type: 'success',
      });
    } catch (error) {
      if (
        isTRPCClientError(error) &&
        error.message === ROUTER_ERROR_DUPLICATED_SITE_SUBDOMAIN
      ) {
        setError('subdomain', 'This subdomain already exists');
      } else {
        showToast({
          title: 'Unknown server error',
          type: 'warning',
        });
      }
      throw error;
    }
  });
  return (
    <section className="w-fit pt-8">
      <CreateSiteForm register={register} errors={errors}>
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
      </CreateSiteForm>
    </section>
  );
}
