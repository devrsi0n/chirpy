import { ROUTER_ERROR_DUPLICATED_SITE_SUBDOMAIN } from '@chirpy-dev/utils';
import * as React from 'react';

import { PageTitle, SiteLayout } from '../../blocks';
import {
  Button,
  IconLoader,
  TextField,
  useToast,
  Tabs,
} from '../../components';
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
      <PageTitle className="mb-4">Site settings</PageTitle>
      <Tabs className="w-80" defaultValue="general">
        <Tabs.List>
          <Tabs.Trigger value="general">General</Tabs.Trigger>
          <Tabs.Trigger value="customDomain">Custom domain</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="general">
          <section className="w-fit pt-8">
            <CreateSiteForm register={register} errors={errors}>
              <Button
                className="w-full sm:w-auto"
                disabled={hasError || isLoading}
                color="primary"
                variant="solid"
                onClick={handleClickSubmit}
              >
                {isLoading && (
                  <IconLoader className="animate-spin text-white" />
                )}
                <span>Save</span>
              </Button>
            </CreateSiteForm>
          </section>
        </Tabs.Content>
        <Tabs.Content value="customDomain">
          <section className='pt-8'>
            <TextField
              {...register('customDomain')}
              label="Custom domain"
              prefix="https://"
            />
          </section>
        </Tabs.Content>
      </Tabs>
    </SiteLayout>
  );
}
