import {
  SITE_DESCRIPTION_VALIDATION,
  SITE_NAME_VALIDATION,
  SITE_SUBDOMAIN_VALIDATION,
  SITE_PAGE_URL_VALIDATION,
} from '@chirpy-dev/trpc/src/ui';
import * as React from 'react';

import { TextArea, TextField } from '../../../../components';
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
      <TextField
        {...register('name', {
          zod: SITE_NAME_VALIDATION,
        })}
        aria-label="Name of this site"
        label="Name"
        errorMessage={errors.name}
        placeholder="My blog"
      />
      <TextArea
        {...register('pageUrl', {
          zod: SITE_PAGE_URL_VALIDATION,
        })}
        aria-label="Notion page URL"
        label="Notion page URL"
        errorMessage={errors.pageUrl}
        styles={{
          textarea: 'min-h-[7em]',
        }}
        hintText={
          pageUrlFieldHint ??
          "Back to the previous page to get the page URL if you don't have one"
        }
      />
      <TextField
        {...register('subdomain', {
          zod: SITE_SUBDOMAIN_VALIDATION,
        })}
        suffix={`.chirpy.dev`}
        label="Subdomain"
        errorMessage={errors.subdomain}
        placeholder="blog"
      />
      <TextArea
        {...register('description', {
          zod: SITE_DESCRIPTION_VALIDATION,
        })}
        aria-label="description of this site"
        label="Description"
        errorMessage={errors.description}
        placeholder="My awesome blog"
      />
      {children}
    </form>
  );
}
