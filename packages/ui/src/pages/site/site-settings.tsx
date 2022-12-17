import { ROUTER_ERROR_DUPLICATED_SITE_SUBDOMAIN } from '@chirpy-dev/utils';
import * as React from 'react';

import { PageTitle, SiteLayout } from '../../blocks';
import { Button, IconLoader, TextField, useToast } from '../../components';
import { useForm } from '../../hooks';
import { isTRPCClientError, trpcClient } from '../../utilities';
import { CreateSiteForm } from '../dashboard/create-site-form';

export type SiteSettingsProps = {
  id: string;
};

export function SiteSettings({ id }: SiteSettingsProps): JSX.Element {
  const { data } = trpcClient.site.byId.useQuery(id);
  const { register, setFields, errors, hasError, handleSubmit, setError } =
    useForm({
      defaultValues: {
        name: '',
        description: '',
        subdomain: '',
        customDomain: '',
      },
      resetAfterSubmit: false,
    });
  React.useEffect(() => {
    if (data?.id) {
      setFields({
        name: data.name,
        description: data.description || '',
        subdomain: data.subdomain,
        customDomain: data.customDomain || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const { mutateAsync: updateSite, isLoading } =
    trpcClient.site.update.useMutation();
  const utils = trpcClient.useContext();
  const { showToast } = useToast();
  const handleClickSubmit = handleSubmit(async (fields) => {
    try {
      const { customDomain, ...otherFields } = fields;
      await updateSite({
        id,
        ...otherFields,
        // Optional
        ...(customDomain.length > 0 && {
          customDomain,
        }),
      });
      utils.site.byId.invalidate(id);
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
    <SiteLayout title="Site settings">
      <PageTitle>Site settings</PageTitle>
      <CreateSiteForm register={register} errors={errors}>
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
      </CreateSiteForm>
    </SiteLayout>
  );
}
