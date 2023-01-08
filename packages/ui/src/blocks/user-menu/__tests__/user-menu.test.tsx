import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { WidgetUserMenu } from '..';
import { pageRender } from '../../../__tests__/fixtures/page-render';
import { mockUserData } from '../../../__tests__/mocks/data/user';

describe('UserMenu', () => {
  afterEach(() => {
    jest.clearAllMocks();
    return cleanup();
  });

  describe('Variant Widget', () => {
    it('should render user display name after clicking the button', async () => {
      await renderMenu();
      await waitFor(() =>
        expect(screen.getByText(mockUserData.name)).toBeInTheDocument(),
      );
    });
  });
});

async function renderMenu() {
  pageRender(<WidgetUserMenu />);
  const menuButton = screen.getByLabelText(/click to open the menu/i);
  await userEvent.click(menuButton);
}
