import { ComponentMeta, ComponentStory } from '@storybook/react';

import { InputField, TextInput } from '../input-field';

type InputFieldType = typeof InputField;
export default {
  title: 'Components/InputField',
  component: InputField,
} as ComponentMeta<InputFieldType>;

export const TextInputStory: ComponentStory<InputFieldType> = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <InputField label="Default">
        <TextInput />
      </InputField>
      <InputField label="Hint text" hintText="This is a hint text">
        <TextInput placeholder="alice@chirpy.dev" />
      </InputField>
      <InputField label="Disabled" hintText="This is a hint text" disabled>
        <TextInput placeholder="bob@chirpy.dev" />
      </InputField>
      <InputField
        label="Error"
        hintText="This is a hint text"
        errorMessage="Email is invalid"
      >
        <TextInput placeholder="charlie@chirpy.dev" />
      </InputField>
    </div>
  );
};

// export const Default = Template.bind({});
// Default.args = {
//   label: 'Default',
// };

// export const WithHintText = Template.bind({});
// WithHintText.args = {
//   label: 'With Hint Text',
//   hintText: 'This is a hint text',
// };
