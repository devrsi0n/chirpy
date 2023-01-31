import { ROUTER_ERROR_DUPLICATED_SITE_SUBDOMAIN } from '@chirpy-dev/utils';
import { useRouter } from 'next/router';
import * as React from 'react';

import { Button, IconLoader, useToast } from '../../../../components';
import { useForm } from '../../../../hooks';
import {
  isTRPCClientError,
  RouterOutputs,
  trpcClient,
} from '../../../../utilities';
import { SiteForm } from '../create/site-form';

export type SiteGeneralSettingsProps = {
  subdomain: string;
  data?: RouterOutputs['site']['bySubdomain'];
};

export function SiteGeneralSettings({
  subdomain,
  data,
}: SiteGeneralSettingsProps): JSX.Element {
  const { register, setFields, errors, hasError, handleSubmit, setError } =
    useForm({
      defaultValues: {
        name: '',
        description: '',
        subdomain: '',
        pageUrl: '',
      },
      resetAfterSubmit: false,
    });
  React.useEffect(() => {
    if (data?.id) {
      setFields({
        name: data.name,
        description: data.description || '',
        subdomain: data.subdomain,
        pageUrl: data.pageUrl,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const { mutateAsync: updateSite, isLoading } =
    trpcClient.site.update.useMutation();
  const trpcCtx = trpcClient.useContext();
  const { showToast } = useToast();
  const router = useRouter();
  const handleClickSubmit = handleSubmit(async (fields) => {
    try {
      await updateSite({
        ...fields,
      });
      trpcCtx.site.bySubdomain.invalidate(subdomain);
      showToast({
        title: 'Update site settings successfully!',
        type: 'success',
      });
      if (fields.subdomain !== subdomain) {
        setTimeout(() => {
          // Redirect to new URL
          router.push(`/site/${fields.subdomain}/settings`);
        }, 3000);
      }
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
      <SiteForm register={register} errors={errors} pageUrlFieldHint="">
        <Button
          className="w-full sm:w-auto"
          disabled={hasError || isLoading}
          variant="primary"
          onClick={handleClickSubmit}
        >
          {isLoading && <IconLoader className="animate-spin text-white" />}
          <span>Save</span>
        </Button>
      </SiteForm>
    </section>
  );
}
