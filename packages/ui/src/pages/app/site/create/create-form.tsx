import { ROUTER_ERROR_DUPLICATED_SITE_SUBDOMAIN } from '@chirpy-dev/utils';
import { useRouter } from 'next/router';
import * as React from 'react';

import { Heading } from '../../../../components';
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
        logo: '',
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
      <section className="flex max-w-4xl flex-col gap-10">
        <p className="text-base font-semibold text-primary-900">
          Create new site
        </p>
        <div className="flex flex-col gap-8">
          <Heading as="h1" className="text-display-md font-semibold">
            Confirm site info
          </Heading>
          <SiteForm register={register} errors={errors} />
        </div>
        <div className="flex justify-between">
          <PaginationLink type="prev" href="/site/create">
            Duplicate template
          </PaginationLink>
          <PaginationLink
            disabled={hasError}
            variant="primary"
            onClick={handleClickSubmit}
            type="next"
          >
            Create
          </PaginationLink>
        </div>
      </section>
    </AppLayout>
  );
}
