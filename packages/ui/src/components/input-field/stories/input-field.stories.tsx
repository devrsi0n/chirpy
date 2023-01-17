import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from 'src/components';
import { Divider } from 'src/components/divider';
import { IconMessageSquare } from 'src/components/icons';
import { useForm } from 'src/hooks';
import { EMAIL_REGEXP } from 'src/utilities';

import { InputField } from '../input-field';
import { SelectInput } from '../select-input';
import { TextAreaInput as TextAreaInputComponent } from '../text-area-input';
import { TextInput as TextInputComponent } from '../text-input';

type InputFieldType = typeof InputField;
export default {
  title: 'Components/InputField',
  component: InputField,
} as ComponentMeta<InputFieldType>;

export const TextInput: ComponentStory<InputFieldType> = (...args) => {
  return (
    <div className="mx-8 flex flex-col gap-6">
      <InputField label="Default">
        <TextInputComponent />
      </InputField>
      <InputField
        label="Hint text"
        hintText="This is a hint text to help user."
      >
        <TextInputComponent defaultValue="alice@chirpy.dev" />
      </InputField>
      <InputField label="Disabled" hintText="This is a hint text to help user.">
        <TextInputComponent placeholder="bob@chirpy.dev" disabled />
      </InputField>
      <InputField
        label="Error"
        hintText="This is a hint text to help user."
        errorMessage="Email is invalid"
      >
        <TextInputComponent placeholder="charlie@chirpy.dev" />
      </InputField>
      <InputField label="URL" hintText="Enter your domain">
        <TextInputComponent prefixNode="https://" placeholder="chirpy.dev" />
      </InputField>
      <InputField label="Suffix" hintText="Look at my suffix">
        <TextInputComponent placeholder="sixian" suffixNode=".chirpy.dev" />
      </InputField>
      <InputField
        label="Prefix and Suffix"
        hintText="Enter your subdomain"
        errorMessage="Invalid URL"
      >
        <TextInputComponent
          prefixNode="https://"
          placeholder="sixian"
          suffixNode={<IconMessageSquare size={16} />}
        />
      </InputField>
    </div>
  );
};

export const Select: ComponentStory<InputFieldType> = (...args) => {
  const items = ['Apple', 'Banana', 'Blueberry', 'Strawberry', 'Grapes'].map(
    (f, i) => (
      <SelectInput.Item
        disabled={f === 'Grapes'}
        key={`${f}-${i}`}
        value={f.toLowerCase()}
      >
        {f}
      </SelectInput.Item>
    ),
  );
  return (
    <div className="mx-8 flex flex-col gap-6">
      <InputField label="Default">
        <SelectInput placeholder="Select your fruit">{items}</SelectInput>
      </InputField>
      <InputField
        label="Hint text"
        hintText="This is a hint text to help user."
      >
        <SelectInput placeholder="Select your fruit">{items}</SelectInput>
      </InputField>
      <InputField label="Long list" hintText="This is a long list">
        <SelectInput placeholder="Select your fruit">
          {Array.from({ length: 50 }, (_, i) => (
            <SelectInput.Item key={i} value={i.toString()}>
              {i}
            </SelectInput.Item>
          ))}
        </SelectInput>
      </InputField>
      <InputField label="Disabled" hintText="This is disabled">
        <SelectInput placeholder="Select your fruit" disabled />
      </InputField>
    </div>
  );
};

export const TextAreaInput: ComponentStory<InputFieldType> = (...args) => {
  return (
    <div className="mx-8 flex flex-col gap-6">
      <InputField label="Description">
        <TextAreaInputComponent defaultValue="A story about Chirpy" />
      </InputField>
      <InputField
        label="Hint text"
        hintText="This is a hint text to help user."
      >
        <TextAreaInputComponent placeholder="Enter a description..." />
      </InputField>
      <InputField label="Disabled" hintText="This is a hint text to help user.">
        <TextAreaInputComponent placeholder="This is disabled." disabled />
      </InputField>
      <InputField
        label="Error"
        hintText="This is a hint text to help user"
        errorMessage="Email is invalid"
      >
        <TextAreaInputComponent placeholder="charlie@chirpy.dev" />
      </InputField>
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
      <div className="max-w-xl rounded-xl border border-gray-500 bg-white shadow-sm">
        <div className="flex flex-col items-start justify-start gap-6 p-6">
          <div className="flex w-full flex-row items-start justify-between gap-4">
            <InputField
              {...register('firstName', {
                required: { value: true, message: 'First name is required' },
              })}
              label="First name"
              errorMessage={errors.firstName}
            >
              <TextInputComponent placeholder="Olivia" />
            </InputField>

            <InputField
              {...register('lastName', {
                required: { value: true, message: 'Last name is required' },
              })}
              label="Last name"
              errorMessage={errors.lastName}
            >
              <TextInputComponent placeholder="Rhye" />
            </InputField>
          </div>

          <InputField
            {...register('description')}
            label="Description"
            hintText="Tell me about yourself"
          >
            <TextAreaInputComponent placeholder="Enter a description..." />
          </InputField>

          <InputField
            {...register('email', {
              required: { value: true, message: 'Email is required' },
              pattern: {
                value: EMAIL_REGEXP,
                message: 'Invalid email address',
              },
            })}
            label="Email address"
            errorMessage={errors.email}
          >
            <TextInputComponent placeholder="olivia@chirpy.dev" />
          </InputField>

          <InputField
            {...register('country', {
              required: { value: true, message: 'Country is required' },
            })}
            label="Country"
            errorMessage={errors.country}
          >
            <SelectInput placeholder="Select your country">
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
                <SelectInput.Item key={c} value={c.toLowerCase()}>
                  {c}
                </SelectInput.Item>
              ))}
            </SelectInput>
          </InputField>
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
            variant="solid"
            color="primary"
            onClick={handleSubmit(async (data) => console.log(data))}
          >
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
};
