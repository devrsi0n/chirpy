import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { pageRender } from '../../../__tests__/fixtures/page-render';
import { mockProject } from '../../../__tests__/mocks/mock-project-data';
import { mockNextRouter } from '../../../__tests__/mocks/next-router';
import { DashboardHome } from '../home';
import { DeleteProject } from '../settings/delete-project';

describe('dashboard', () => {
  beforeEach(() => {
    pageRender(<DashboardHome username="jest" projects={[mockProject]} />);
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
    pageRender(
      <DeleteProject
        domain={mockProject.domain}
        name={mockProject.name}
        username="jest"
      />,
    );
    const deleteButton = screen.getByRole('button', {
      name: /delete/i,
    });
    expect(deleteButton).toBeTruthy();
    await userEvent.click(deleteButton);
    const dialog = await screen.findByRole('dialog', {
      name: `Delete project ${mockProject.name}`,
    });
    await userEvent.click(
      within(dialog).getByRole('button', { name: 'Delete' }),
    );
    await waitFor(() =>
      expect(mockNextRouter.push).toHaveBeenCalledWith('/dashboard/jest'),
    );
  });
});
