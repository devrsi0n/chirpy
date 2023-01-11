import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from 'src/components/button';
import { IconMessageSquare } from 'src/components/icons';

import { InputField, TextInput as TextInputComponent } from '../input-field';

type InputFieldType = typeof InputField;
export default {
  title: 'Components/InputField',
  component: InputField,
} as ComponentMeta<InputFieldType>;

export const TextInput: ComponentStory<InputFieldType> = (...args) => {
  return (
    <div className="mx-8 flex flex-col gap-6">
      <InputField label="Default" {...args}>
        <TextInputComponent />
      </InputField>
      <InputField label="Hint text" hintText="This is a hint text">
        <TextInputComponent placeholder="alice@chirpy.dev" />
      </InputField>
      <InputField label="Disabled" hintText="This is a hint text">
        <TextInputComponent placeholder="bob@chirpy.dev" disabled />
      </InputField>
      <InputField
        label="Error"
        hintText="This is a hint text"
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
