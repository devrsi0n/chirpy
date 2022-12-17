import * as React from 'react';

import { TextArea, TextField } from '../../components';
import { FormError, Register } from '../../hooks';

export type CreateSiteFormProps<T> = {
  register: Register;
  errors: FormError<T>;
  children?: React.ReactNode;
};

export type SiteForm = {
  name: string;
  subdomain: string;
  description: string;
};

export function CreateSiteForm<T extends SiteForm>({
  register,
  errors,
  children,
}: CreateSiteFormProps<T>): JSX.Element {
  return (
    <form className="flex w-80 flex-col space-y-4">
      <TextField
        {...register('name', {
          required: { value: true, message: 'Name is required' },
          maxLength: { value: 64, message: 'At most 64 characters' },
        })}
        aria-label="Name of this site"
        label="Name"
        errorMessage={errors.name}
        placeholder="My blog"
      />
      <TextField
        {...register('subdomain', {
          required: { value: true, message: 'Subdomain is required' },
          pattern: {
            value: /^[A-Za-z]+$/,
            message: `Only word characters are allowed`,
          },
        })}
        suffix=".chirpy.dev"
        label="Subdomain"
        errorMessage={errors.subdomain}
        placeholder="blog"
      />
      <TextArea
        {...register('description', {
          maxLength: { value: 190, message: 'At most 190 characters' },
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
