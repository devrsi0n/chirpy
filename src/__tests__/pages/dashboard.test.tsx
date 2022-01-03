import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { project } from '$/__tests__/mocks/mockProjectData';
import * as projectModule from '$/graphql/generated/project';
import * as userModule from '$/graphql/generated/user';
import Dashboard from '$/pages/dashboard/index';

import { pageRender } from '../fixtures/page-render';

const mockFetchUserProject = jest.fn();
jest.spyOn(userModule, 'useUserDashboardProjectsLazyQuery').mockReturnValue([
  mockFetchUserProject,
  {
    data: {
      userByPk: {
        projects: [project],
      },
    },
  } as any,
]);

const mockInsertProject = jest.fn();
jest.spyOn(projectModule, 'useInsertOneProjectMutation').mockReturnValue([
  mockInsertProject,
  {
    loading: false,
  } as any,
]);
const mockDeleteProject = jest.fn();
jest.spyOn(projectModule, 'useDeleteProjectByPkMutation').mockReturnValue([
  mockDeleteProject,
  {
    loading: false,
  } as any,
]);

describe('dashboard', () => {
  beforeEach(() => {
    pageRender(<Dashboard />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the texts', () => {
    expect(
      screen.getByRole('heading', {
        name: 'Dashboard',
      }),
    ).toBeTruthy();
    expect(screen.getByText(project.name)).toBeTruthy();
    expect(screen.getByText(project.pages[0].title!)).toBeTruthy();
    expect(screen.getByText(/^Created \w+/)).toBeTruthy();
  });

  it('should delete the project', async () => {
    const menu = screen.getByRole('button', {
      name: /show more project options/i,
    });
    userEvent.click(menu);
    const deleteOption = screen.getByRole('menuitem', {
      name: /delete/i,
    });
    expect(deleteOption).toBeTruthy();
    userEvent.click(deleteOption);
    const deleteButton = screen.getByRole('button', {
      name: /delete/i,
    });
    expect(deleteButton).toBeTruthy();
    userEvent.click(deleteButton);
    expect(mockDeleteProject).toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByText(/Delete the project/)).toBeFalsy());
  });
});
