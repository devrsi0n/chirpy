import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Dashboard } from '..';
import { pageRender } from '../../../../__tests__/fixtures/page-render';
import { mockProject } from '../../../../__tests__/mocks/mock-project-data';

describe.skip('dashboard', () => {
  beforeEach(() => {
    pageRender(<Dashboard />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the texts', async () => {
    expect(
      screen.getByRole('heading', {
        name: 'Dashboard',
      }),
    ).toBeTruthy();
    await waitFor(() => {
      expect(screen.getByText(mockProject.name)).toBeTruthy();
    });
    expect(screen.getByText(mockProject.pages[0].title!)).toBeTruthy();
    expect(screen.getByText(/^Created \w+/)).toBeTruthy();
    await waitFor(() =>
      expect(screen.getByLabelText('Page views').textContent).toBe('212'),
    );
  });

  it('should delete the project', async () => {
    await waitFor(() => {
      screen.getByRole('button', {
        name: /show more project options/i,
      });
    });
    const menu = screen.getByRole('button', {
      name: /show more project options/i,
    });
    await userEvent.click(menu);
    const deleteOption = screen.getByRole('menuitem', {
      name: /delete/i,
    });
    expect(deleteOption).toBeTruthy();
    await userEvent.click(deleteOption);
    const deleteButton = screen.getByRole('button', {
      name: /delete/i,
    });
    expect(deleteButton).toBeTruthy();
    await userEvent.click(deleteButton);
    await waitFor(() =>
      expect(screen.queryByText(/Delete the project/)).toBeFalsy(),
    );
    await waitFor(() =>
      expect(screen.getByLabelText('Page views').textContent).toBe('212'),
    );
  });
});
