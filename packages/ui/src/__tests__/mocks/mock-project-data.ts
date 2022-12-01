import { ProjectCardProps } from '../../blocks/project-card/project-card';

export const mockProject: ProjectCardProps['project'] = {
  id: '123',
  name: 'Test Project',
  domain: 'test.page',
  createdAt: new Date('2021-01-01T00:00:00.000Z'),
  pages: [
    {
      id: '1',
      url: 'https://test.page/docs/1',
      title: 'Title of a testing page',
    },
  ],
};
