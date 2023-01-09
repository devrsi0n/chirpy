import { ROUTER_ERROR_DUPLICATED_SITE_SUBDOMAIN } from '@chirpy-dev/utils';
import { useRouter } from 'next/router';
import * as React from 'react';

import { PageTitle } from '../../../../blocks';
import { Button, Card } from '../../../../components';
import { useForm } from '../../../../hooks';
import { isTRPCClientError, trpcClient } from '../../../../utilities';
import { PaginationLink } from '../../../home/docs/pagination';
import { AppLayout } from '../../components/app-layout';
import { SiteForm, SiteFormFields } from './site-form';

export function CreateSiteForm(): JSX.Element {
  const { mutateAsync: createSite } = trpcClient.site.create.useMutation();
  const { register, errors, handleSubmit, hasError, setError } =
    useForm<SiteFormFields>({
      defaultValues: {
        name: '',
        pageUrl: '',
        subdomain: '',
        description: '',
      },
    });
  const trpcCtx = trpcClient.useContext();
  const router = useRouter();
  const handleClickSubmit = handleSubmit(
    async (fields, _event: unknown): Promise<void> => {
      let result: { id: string };
      try {
        result = await createSite({
          name: fields.name,
          subdomain: fields.subdomain,
          description: fields.description,
          pageUrl: fields.pageUrl,
        });
      } catch (error: unknown) {
        if (
          isTRPCClientError(error) &&
          error.message === ROUTER_ERROR_DUPLICATED_SITE_SUBDOMAIN
        ) {
          setError('subdomain', 'This subdomain already exists');
        }
        throw error;
      }
      trpcCtx.site.all.invalidate();
      router.push(`/site/${result.id}`);
    },
  );
  return (
    <AppLayout title="Create site form">
      <PageTitle>Create site</PageTitle>
      <div>
        <Card className="w-96 p-6">
          <SiteForm register={register} errors={errors} />
          <div className="mt-6">
            <Button
              className="w-full sm:w-auto"
              disabled={hasError}
              color="primary"
              variant="solid"
              onClick={handleClickSubmit}
            >
              Create
            </Button>
          </div>
        </Card>
      </div>
      <div className="mt-6 flex justify-start">
        <PaginationLink type="prev" href="/site/create/form">
          Duplicate template
        </PaginationLink>
      </div>
    </AppLayout>
  );
}
