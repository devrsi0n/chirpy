import { ProjectCardProps } from '@chirpy/blocks/project-card/project-card';

export const project: ProjectCardProps['project'] = {
  id: '123',
  name: 'Test Project',
  domain: 'test.page',
  createdAt: '2021-01-01T00:00:00.000Z',
  pages: [
    {
      id: '1',
      url: 'https://test.page/docs/1',
      title: 'Title of a testing page',
    },
  ],
};
