import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Dashboard } from '..';
import { pageRender } from '../../../__tests__/fixtures/page-render';
import { project } from '../../../__tests__/mocks/mock-project-data';
import { trpcClient } from '../../../utilities/trpc-client';

const mockFetchUserProject = jest.fn();
jest.spyOn(trpcClient.project.all, 'useQuery').mockReturnValue({
  data: [project],
  refetch: mockFetchUserProject,
  status: 'success',
} as any);

const mockInsertProject = jest.fn();
jest.spyOn(trpcClient.project.create, 'useMutation').mockReturnValue({
  mutateAsync: mockInsertProject,
} as any);
const mockDeleteProject = jest.fn();
jest.spyOn(trpcClient.project.delete, 'useMutation').mockReturnValue({
  mutateAsync: mockDeleteProject,
} as any);

describe('dashboard', () => {
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
    expect(screen.getByText(project.name)).toBeTruthy();
    expect(screen.getByText(project.pages[0].title!)).toBeTruthy();
    expect(screen.getByText(/^Created \w+/)).toBeTruthy();
    await waitFor(() =>
      expect(screen.getByLabelText('Page views').textContent).toBe('212'),
    );
  });

  it('should delete the project', async () => {
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
    expect(mockDeleteProject).toHaveBeenCalled();
    await waitFor(() =>
      expect(screen.queryByText(/Delete the project/)).toBeFalsy(),
    );
    await waitFor(() =>
      expect(screen.getByLabelText('Page views').textContent).toBe('212'),
    );
  });
});
