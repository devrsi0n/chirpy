import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { Menu } from '../menu';

describe('Menu', () => {
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
      <Menu>
        <Menu.Button>
          <span>{contentText}</span>
        </Menu.Button>
        <Menu.Items>
          <Menu.Item onClick={mockHandleClickItem1}>{item1Text}</Menu.Item>
          <Menu.Item>{item2Text}</Menu.Item>
        </Menu.Items>
      </Menu>,
    );
    const button = screen.getByText(contentText);
    expect(button).toBeTruthy();

    await userEvent.click(button);
    await waitFor(() =>
      expect(screen.queryByText(item1Text)).toBeInTheDocument(),
    );
    expect(screen.getByText(item2Text)).toBeInTheDocument();

    await userEvent.click(screen.getByText(item1Text));
    expect(mockHandleClickItem1).toHaveBeenCalledTimes(1);
  });
});
