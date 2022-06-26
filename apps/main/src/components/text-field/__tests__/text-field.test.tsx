import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextField } from '..';

const label = 'TestTextField';
const defaultValue = 'text field default value';

describe('TextField', () => {
  afterEach(() => {
    jest.resetAllMocks();
    return cleanup();
  });

  it('should render the default value and changed value', async () => {
    render(<TextField label={label} defaultValue={defaultValue} />);

    const textField = screen.getByLabelText(label) as HTMLInputElement;
    expect(textField.value).toBe(defaultValue);

    const newText = 'This is a very long testing text';
    await userEvent.clear(textField);
    await userEvent.type(textField, newText);
    expect(textField.value).toBe(newText);
  });

  it('should render the error message', () => {
    const errorMessage = 'This is an error message';
    render(
      <TextField
        label={label}
        defaultValue={defaultValue}
        errorMessage={errorMessage}
      />,
    );
    expect(screen.getByText(errorMessage)).toBeTruthy();
  });
});
