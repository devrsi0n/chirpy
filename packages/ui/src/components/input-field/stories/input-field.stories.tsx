import { ComponentMeta, ComponentStory } from '@storybook/react';
import { IconMessageSquare } from 'src/components/icons';

import { InputField } from '../input-field';
import { SelectInput } from '../select-input';
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
      <InputField label="Hint text" hintText="This is a hint text">
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
