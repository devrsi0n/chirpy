import { trpc } from '@chirpy-dev/trpc/src/client';
import { useRouter } from 'next/router';

import { PageTitle, SiteLayout } from '../blocks';
import { Button, Link, TextField } from '../components';
import { useForm, useLocalStorage } from '../hooks';
import { isValidDomain } from '../utilities';

type FormFields = {
  name: string;
  domain: string;
  queryParameters: string;
};
export function New(): JSX.Element {
  // Just save it, we'll create the project after user login
  const [savedFields, setSavedFields] = useLocalStorage<FormFields>(
    {
      name: '',
      domain: '',
      queryParameters: '',
    },
    'project-creation',
  );
  const router = useRouter();
  return (
    <CreateProject
      fields={savedFields}
      onSubmit={async (fields) => {
        setSavedFields(fields);
        router.push('/auth/sign-in');
      }}
    />
  );
}

export type CreateProjectProps = {
  fields?: FormFields;
  onSubmit: (fields: FormFields) => Promise<void>;
};

export function CreateProject(props: CreateProjectProps): JSX.Element {
  const { register, errors, handleSubmit, setError } = useForm<FormFields>({
    defaultValues: {
      name: '',
      domain: '',
      queryParameters: '',
      ...props.fields,
    },
  });
  const { mutateAsync: validate } = trpc.project.validate.useMutation();
  const handleClickSubmit = handleSubmit(async (fields) => {
    const result = await validate({
      domain: fields.domain,
    });
    if (result === 'DOMAIN_UNIQUE_CONSTRAINT') {
      setError('domain', 'A project associated with this domain already');
      return;
    }
    await props.onSubmit(fields);
  });
  return (
    <SiteLayout title={'Create project'}>
      <PageTitle>Create project</PageTitle>
      <div className="mt-8 flex max-w-lg flex-col gap-8">
        <TextField
          {...register('name', {
            required: { value: true, message: 'Name is required' },
            pattern: {
              value: /^\w+$/,
              message: `Only word characters are allowed`,
            },
            minLength: { value: 1, message: 'At least 1 character' },
            maxLength: { value: 16, message: 'At most 16 characters' },
          })}
          aria-label="Name of this project"
          label="Name"
          errorMessage={errors.name}
          placeholder="Example"
          className="w-full"
        />
        <TextField
          {...register('domain', {
            required: { value: true, message: 'Domain is required' },
            pattern: {
              value: isValidDomain,
              message: 'Invalid domain',
            },
          })}
          label="Domain"
          hintText="Only pages of this domain will be allowed to create comment widget"
          errorMessage={errors.domain}
          placeholder="example.com"
          className="w-full"
        />
        <TextField
          {...register('queryParameters')}
          label="Page identifier (optional)"
          hintText={
            <>
              Chirpy uses the URL domain + path of your pages as the identifier
              by default, please add{' '}
              <Link
                variant="primary"
                href="https://en.wikipedia.org/wiki/Query_string"
              >
                {`query parameters`}
              </Link>{' '}
              as the identifier if needed. Multiple parameters must be separated
              by commas
            </>
          }
          errorMessage={errors.queryParameters}
          placeholder="id,name"
          className="w-full"
        />
        <div className="flex justify-end">
          <Button variant="solid" color="primary" onClick={handleClickSubmit}>
            Create
          </Button>
        </div>
      </div>
    </SiteLayout>
  );
}
