import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Tabs, TabsItem } from '../';

const firstLabel = 'First';
const secondLabel = 'Second';

const firstTabText = 'This is the first tab';
const secondTabText = 'This is the second tab';

const mockOnChange = jest.fn();

describe('Tabs', () => {
  beforeEach(() => {
    render(
      <Tabs initialValue="first-tab" onChange={mockOnChange}>
        <TabsItem label={firstLabel} value="first-tab">
          <p>{firstTabText}</p>
        </TabsItem>
        <TabsItem label={secondLabel} value="second-tab">
          <p>{secondTabText}</p>
        </TabsItem>
      </Tabs>,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
    return cleanup();
  });

  it('should render the first tab', () => {
    expect(screen.getByText(firstTabText)).toBeInTheDocument();
  });

  it('should render the second tab after clicking the button', () => {
    const secondTab = screen.getByText(secondLabel);
    expect(mockOnChange).not.toHaveBeenCalled();
    userEvent.click(secondTab);
    expect(screen.getByText(secondTabText)).toBeInTheDocument();
    expect(mockOnChange).toHaveBeenCalled();
  });
});
