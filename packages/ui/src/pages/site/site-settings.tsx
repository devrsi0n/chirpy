import * as React from 'react';

import { PageTitle, SiteLayout } from '../../blocks';
import { TextArea, TextField } from '../../components';
import { useForm } from '../../hooks';
import { trpcClient } from '../../utilities';

export type SiteSettingsProps = {
  id: string;
};

export function SiteSettings({ id }: SiteSettingsProps): JSX.Element {
  const { data } = trpcClient.site.byId.useQuery(id);
  const { register } = useForm({
    defaultValues: {
      name: data?.name || '',
      description: data?.description || '',
      subdomain: data?.subdomain || '',
      customDomain: data?.customDomain || '',
    },
  });
  return (
    <SiteLayout title="Site settings">
      <PageTitle>Site settings</PageTitle>
      <form className="w-6xl space-y-4">
        <TextField {...register('name')} label="Site name" />
        <TextArea {...register('description')} label="Site description" />
        <TextField {...register('subdomain')} label="Subdomain" />
        <TextField {...register('customDomain')} label="Custom domain" />
      </form>
    </SiteLayout>
  );
}
