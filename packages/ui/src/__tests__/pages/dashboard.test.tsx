import * as graphqlModule from '@chirpy-dev/graphql';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { project } from '../../__tests__/mocks/mock-project-data';
import { Dashboard } from '../../pages/dashboard';
import { pageRender } from '../fixtures/page-render';

jest.mock('@chirpy-dev/graphql', () => {
  return {
    // Make exported object configable
    __esModule: true,
    ...jest.requireActual('@chirpy-dev/graphql'),
  };
});

const mockFetchUserProject = jest.fn();
jest.spyOn(graphqlModule, 'useUserDashboardProjectsQuery').mockReturnValue([
  {
    data: {
      userByPk: {
        projects: [project],
      },
    },
  } as any,
  mockFetchUserProject,
]);

const mockInsertProject = jest.fn();
jest.spyOn(graphqlModule, 'useInsertOneProjectMutation').mockReturnValue([
  {
    loading: false,
  } as any,
  mockInsertProject,
]);
const mockDeleteProject = jest.fn();
jest.spyOn(graphqlModule, 'useDeleteProjectByPkMutation').mockReturnValue([
  {
    loading: false,
  } as any,
  mockDeleteProject,
]);

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
