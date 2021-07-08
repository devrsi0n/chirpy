import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { DropDownMenu } from '../DropDownMenu';

describe('DropDownMenu', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should show the menu items when click the menu', async () => {
    const contentText = 'button';
    const item1Text = 'item 1';
    const item2Text = 'item 2';
    const mockHandleClickItem1 = jest.fn();
    render(
      <DropDownMenu content={<span>{contentText}</span>}>
        <DropDownMenu.Item onClick={mockHandleClickItem1}>{item1Text}</DropDownMenu.Item>
        <DropDownMenu.Item>{item2Text}</DropDownMenu.Item>
      </DropDownMenu>,
    );
    const button = screen.getByText(contentText);
    expect(button).toBeTruthy();

    userEvent.click(button);
    await waitFor(() => expect(screen.queryByText(item1Text)).toBeInTheDocument());
    expect(screen.getByText(item2Text)).toBeInTheDocument();

    userEvent.click(screen.getByText(item1Text));
    expect(mockHandleClickItem1).toHaveBeenCalledTimes(1);
  });
});
