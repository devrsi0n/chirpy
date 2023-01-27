import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from 'src/components';
import { Divider } from 'src/components/divider';
import { IconMessageSquare } from 'src/components/icons';
import { useForm } from 'src/hooks';
import { z } from 'zod';

import { Input as TextInputComponent } from '../../input';
import { Select } from '../../select';
import { TextArea as TextAreaInputComponent } from '../../text-area';
import { FormField } from '../form-field';

type FormFieldType = typeof FormField;
export default {
  title: 'Components/FormField',
  component: FormField,
} as ComponentMeta<FormFieldType>;

export const TextInput: ComponentStory<FormFieldType> = () => {
  return (
    <div className="mx-8 flex flex-col gap-6">
      <FormField label="Default">
        <TextInputComponent />
      </FormField>
      <FormField label="Hint text" hintText="This is a hint text to help user.">
        <TextInputComponent defaultValue="alice@chirpy.dev" />
      </FormField>
      <FormField label="Disabled" hintText="This is a hint text to help user.">
        <TextInputComponent placeholder="bob@chirpy.dev" disabled />
      </FormField>
      <FormField
        label="Error"
        hintText="This is a hint text to help user."
        errorMessage="Email is invalid"
      >
        <TextInputComponent placeholder="charlie@chirpy.dev" />
      </FormField>
      <FormField label="URL" hintText="Enter your domain">
        <TextInputComponent prefix="https://" placeholder="chirpy.dev" />
      </FormField>
      <FormField label="Suffix" hintText="Look at my suffix">
        <TextInputComponent placeholder="sixian" suffix=".chirpy.dev" />
      </FormField>
      <FormField
        label="Prefix and Suffix"
        hintText="Enter your subdomain"
        errorMessage="Invalid URL"
      >
        <TextInputComponent
          prefix="https://"
          placeholder="sixian"
          suffix={<IconMessageSquare size={16} />}
        />
      </FormField>
    </div>
  );
};

export const SelectInput: ComponentStory<FormFieldType> = () => {
  const items = ['Apple', 'Banana', 'Blueberry', 'Strawberry', 'Grapes'].map(
    (f, i) => (
      <Select.Item
        disabled={f === 'Grapes'}
        key={`${f}-${i}`}
        value={f.toLowerCase()}
      >
        {f}
      </Select.Item>
    ),
  );
  return (
    <div className="mx-8 flex flex-col gap-6">
      <FormField label="Default">
        <Select placeholder="Select your fruit">{items}</Select>
      </FormField>
      <FormField label="Hint text" hintText="This is a hint text to help user.">
        <Select placeholder="Select your fruit">{items}</Select>
      </FormField>
      <FormField label="Long list" hintText="This is a long list">
        <Select placeholder="Select your fruit">
          {Array.from({ length: 50 }, (_, i) => (
            <Select.Item key={i} value={i.toString()}>
              {i}
            </Select.Item>
          ))}
        </Select>
      </FormField>
      <FormField label="Disabled" hintText="This is disabled">
        <Select placeholder="Select your fruit" disabled />
      </FormField>
    </div>
  );
};

export const TextAreaInput: ComponentStory<FormFieldType> = () => {
  return (
    <div className="mx-8 flex flex-col gap-6">
      <FormField label="Description">
        <TextAreaInputComponent defaultValue="A story about Chirpy" />
      </FormField>
      <FormField label="Hint text" hintText="This is a hint text to help user.">
        <TextAreaInputComponent placeholder="Enter a description..." />
      </FormField>
      <FormField label="Disabled" hintText="This is a hint text to help user.">
        <TextAreaInputComponent placeholder="This is disabled." disabled />
      </FormField>
      <FormField
        label="Error"
        hintText="This is a hint text to help user"
        errorMessage="Email is invalid"
      >
        <TextAreaInputComponent placeholder="charlie@chirpy.dev" />
      </FormField>
    </div>
  );
};

type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  description?: string;
  country: string;
};

export const Form = () => {
  const { register, handleSubmit, errors, hasError } = useForm<FormFields>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      country: 'australia',
    },
  });

  return (
    <div className="mx-8 flex flex-col items-center justify-center">
      <div className="max-w-xl rounded-xl border border-gray-500 bg-gray-100 shadow-sm">
        <div className="flex flex-col items-start justify-start gap-6 p-6">
          <div className="flex w-full flex-row items-start justify-between gap-4">
            <FormField
              {...register('firstName', {
                required: { value: true, message: 'First name is required' },
              })}
              label="First name"
              errorMessage={errors.firstName}
            >
              <TextInputComponent placeholder="Olivia" />
            </FormField>

            <FormField
              {...register('lastName', {
                required: { value: true, message: 'Last name is required' },
              })}
              label="Last name"
              errorMessage={errors.lastName}
            >
              <TextInputComponent placeholder="Rhye" />
            </FormField>
          </div>

          <FormField
            {...register('description')}
            label="Description"
            hintText="Tell me about yourself"
          >
            <TextAreaInputComponent placeholder="Enter a description..." />
          </FormField>

          <FormField
            {...register('email', {
              zod: z.string().email('Invalid email'),
            })}
            label="Email address"
            errorMessage={errors.email}
          >
            <TextInputComponent placeholder="olivia@chirpy.dev" />
          </FormField>

          <FormField
            {...register('country', {
              required: { value: true, message: 'Country is required' },
            })}
            label="Country"
            errorMessage={errors.country}
          >
            <Select placeholder="Select your country">
              {[
                'Australia',
                'Canada',
                'China',
                'France',
                'Germany',
                'India',
                'Japan',
                'United Kingdom',
                'United States',
              ].map((c) => (
                <Select.Item key={c} value={c.toLowerCase()}>
                  {c}
                </Select.Item>
              ))}
            </Select>
          </FormField>
        </div>

        {/* Footer */}
        <Divider className="w-full" />
        <div className="flex items-center justify-end gap-3 py-4 px-6">
          <Button
            onClick={() => {
              console.log('Cancel');
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={hasError}
            variant="primary"
            onClick={handleSubmit(async (data) => console.log(data))}
          >
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
};
