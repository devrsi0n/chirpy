import {
  SITE_DESCRIPTION_VALIDATION,
  SITE_NAME_VALIDATION,
  SITE_SUBDOMAIN_VALIDATION,
  SITE_PAGE_URL_VALIDATION,
} from '@chirpy-dev/trpc/src/ui';
import * as React from 'react';

import { FormField, Input, TextArea } from '../../../../components';
import type { FieldValue, FormError, Register } from '../../../../hooks';

export type SiteFormProps<T extends FieldValue> = {
  register: Register<T>;
  errors: FormError<T>;
  children?: React.ReactNode;
  pageUrlFieldHint?: string;
};

export type SiteFormFields = {
  name: string;
  subdomain: string;
  description: string;
  pageUrl: string;
};

export function SiteForm<T extends SiteFormFields>({
  register,
  errors,
  pageUrlFieldHint,
  children,
}: SiteFormProps<T>): JSX.Element {
  return (
    <form className="flex w-80 flex-col space-y-4">
      <FormField
        {...register('name', {
          zod: SITE_NAME_VALIDATION,
        })}
        label="Name"
        errorMessage={errors.name}
      >
        <Input placeholder="My blog" />
      </FormField>

      <FormField
        {...register('pageUrl', {
          zod: SITE_PAGE_URL_VALIDATION,
        })}
        label="Notion page URL"
        errorMessage={errors.pageUrl}
        hint={
          pageUrlFieldHint ??
          "Back to the previous page to get the page URL if you don't have one"
        }
      >
        <TextArea className="min-h-[7em]" />
      </FormField>

      <FormField
        {...register('subdomain', {
          zod: SITE_SUBDOMAIN_VALIDATION,
        })}
        label="Subdomain"
        errorMessage={errors.subdomain}
      >
        <Input suffix={`.chirpy.dev`} placeholder="blog" />
      </FormField>
      <FormField
        {...register('description', {
          zod: SITE_DESCRIPTION_VALIDATION,
        })}
        label="Description"
        errorMessage={errors.description}
      >
        <TextArea placeholder="My awesome blog" />
      </FormField>
      {children}
    </form>
  );
}
