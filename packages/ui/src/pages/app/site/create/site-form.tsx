import {
  SITE_DESCRIPTION_VALIDATION,
  SITE_NAME_VALIDATION,
  SITE_SUBDOMAIN_VALIDATION,
  SITE_PAGE_URL_VALIDATION,
} from '@chirpy-dev/trpc/src/ui';
import * as React from 'react';

import { Uploader } from '../../../../blocks';
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
  logo: string;
};

export function SiteForm<T extends SiteFormFields>({
  register,
  errors,
  pageUrlFieldHint,
  children,
}: SiteFormProps<T>): JSX.Element {
  return (
    <form className="flex flex-col gap-5">
      <FormField
        {...register('name', {
          zod: SITE_NAME_VALIDATION,
        })}
        label="Name"
        errorMessage={errors.name}
        layout="horizontal"
      >
        <Input placeholder="Olivia" />
      </FormField>
      <Divider />
      <FormField
        {...register('pageUrl', {
          zod: SITE_PAGE_URL_VALIDATION,
        })}
        label="Notion URL"
        errorMessage={errors.pageUrl}
        hint={pageUrlFieldHint ?? 'Past the URL you have copied.'}
        layout="horizontal"
      >
        <TextArea
          className="min-h-[7em]"
          placeholder="https://xxx.notion.site/xxx"
        />
      </FormField>
      <Divider />
      <FormField
        {...register('subdomain', {
          zod: SITE_SUBDOMAIN_VALIDATION,
        })}
        label="Subdomain"
        errorMessage={errors.subdomain}
        layout="horizontal"
      >
        <Input suffix={`.chirpy.dev`} placeholder="olivia" />
      </FormField>
      <Divider />
      <FormField
        {...register('description', {
          zod: SITE_DESCRIPTION_VALIDATION,
        })}
        label="Description"
        errorMessage={errors.description}
        layout="horizontal"
        hint="Used for SEO and social media."
      >
        <TextArea placeholder="My awesome blog" />
      </FormField>
      <Divider />
      <FormField
        {...register('logo')}
        label="Site logo"
        errorMessage={errors.logo}
        layout="horizontal"
        hint="This will be displayed on your site."
      >
        <Uploader
          accept="image/png, image/jpeg, image/jpg, image/webp, image/svg, image/gif"
          description="SVG, PNG, JPG or WebP (max. 600 x 600px)"
          onValidate={async (file: File) => {
            return await new Promise((resolve, reject) => {
              const img = new Image();
              const objectUrl = URL.createObjectURL(file);
              img.addEventListener('load', function () {
                if (this.width > 600 || this.height > 600) {
                  reject(new Error('Exceed the max image dimension'));
                }
                URL.revokeObjectURL(objectUrl);
                resolve();
              });
              img.src = objectUrl;
            });
          }}
        />
      </FormField>
      {children}
    </form>
  );
}

function Divider(): JSX.Element {
  return <div role="separator" className="h-[1px] bg-gray-400" />;
}
