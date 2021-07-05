import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ToastProvider, useToast } from '../';

describe('Toast', () => {
  beforeEach(() => {
    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
    return cleanup();
  });

  it('should render toast after clicking the button', () => {
    const button = screen.getByRole('button', {
      name: buttonLabel,
    });
    userEvent.click(button);
    expect(screen.getByText(toastTitle)).toBeInTheDocument();
  });
});

const buttonLabel = 'Show toast';
const toastTitle = 'toast warning';

function ToastDemo() {
  const toast = useToast();
  const handleClick = () => {
    toast.showToast({
      title: toastTitle,
      type: 'warning',
      description: 'somehing wrong',
    });
  };
  return (
    <button onClick={handleClick} aria-label={buttonLabel}>
      {buttonLabel}
    </button>
  );
}
