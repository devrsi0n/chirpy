import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { pageRender } from '../../../__tests__/fixtures/page-render';
import { mockUserData } from '../../../__tests__/mocks/data/user';

import { UserMenu, UserMenuProps } from '..';

describe('UserMenu', () => {
  afterEach(() => {
    jest.clearAllMocks();
    return cleanup();
  });

  describe('Variant Nav', () => {
    it('should render user display name after clicking the button with nav variant', async () => {
      await renderMenu('Nav');
      await waitFor(() =>
        expect(screen.getByText(mockUserData.name)).toBeInTheDocument(),
      );
    });
  });

  describe('Variant Widget', () => {
    it('should render user display name after clicking the button', async () => {
      await renderMenu('Widget');
      await waitFor(() =>
        expect(screen.getByText(mockUserData.name)).toBeInTheDocument(),
      );
    });
  });
});

async function renderMenu(variant: UserMenuProps['variant']) {
  pageRender(<UserMenu variant={variant} />);
  const menuButton = screen.getByLabelText(/click to open the menu/i);
  await userEvent.click(menuButton);
}
