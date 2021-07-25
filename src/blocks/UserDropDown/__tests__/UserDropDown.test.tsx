import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { pageRender } from '$/__tests__/fixtures/page-render';
import { mockUserData } from '$/__tests__/mocks/CurrentUserProvider';

import { UserDropDown, UserDropDownProps } from '../';

describe('UserDropDown', () => {
  afterEach(() => {
    jest.resetAllMocks();
    return cleanup();
  });

  describe('Variant Nav', () => {
    it('should render user display name after clicking the button with nav variant', async () => {
      renderDropMenu('Nav');
      await waitFor(() => expect(screen.getByText(mockUserData.name)).toBeInTheDocument());
    });
  });

  describe('Variant Widget', () => {
    it('should render user display name after clicking the button', async () => {
      renderDropMenu('Widget');
      await waitFor(() => expect(screen.getByText(mockUserData.name)).toBeInTheDocument());
    });
  });
});

function renderDropMenu(variant: UserDropDownProps['variant']) {
  pageRender(<UserDropDown variant={variant} />);
  const menuButton = screen.getByLabelText('Click to open dorp down');
  userEvent.click(menuButton);
}
