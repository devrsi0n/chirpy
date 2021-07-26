import { cleanup, render, screen } from '@testing-library/react';

import { ProjectCard, ProjectCardProps } from '../';

const project: ProjectCardProps['project'] = {
  id: '123',
  name: 'Test Project',
  createdAt: '2021-01-01T00:00:00.000Z',
  pages: [
    {
      id: '1',
      url: 'https://test.page',
      title: 'Title of a testing page',
    },
  ],
  sessionsYesterday: [
    {
      events_aggregate: {
        aggregate: {
          count: 1,
        },
        nodes: [
          {
            created_at: '2021-01-02T00:00:00.000Z',
          },
        ],
      },
    },
  ],
  sessionsTwoDaysAgo: [
    {
      events_aggregate: {
        aggregate: {
          count: 1,
        },
        nodes: [
          {
            created_at: '2021-01-01T00:00:00.000Z',
          },
        ],
      },
    },
  ],
};

describe('ProjectCard', () => {
  beforeEach(() => {
    render(<ProjectCard project={project} />);
  });

  afterEach(() => {
    jest.resetAllMocks();
    return cleanup();
  });

  it('should render the texts', () => {
    expect(screen.getByText(project.name)).toBeTruthy();
    expect(screen.getByText(project.pages[0].title)).toBeTruthy();
    expect(screen.getByText(/^Created \w+/)).toBeTruthy();
  });
});
