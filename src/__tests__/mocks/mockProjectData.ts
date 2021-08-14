import { ProjectCardProps } from '../../blocks/ProjectCard/ProjectCard';

export const project: ProjectCardProps['project'] = {
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
