import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SideBar, SideBarProps } from '../';

const title = 'Title of side bar';
const children = [
  {
    title: 'this is a child title 1',
    route: '/parent/child-1',
  },
  {
    title: 'this is a child title 2',
    route: '/parent/child-2',
  },
];
const directories: SideBarProps['directories'] = [
  {
    title: 'this is a testing title',
    children,
  },
  {
    title: 'this is a file route',
    route: '/file-route',
  },
];

describe('SideBar', () => {
  beforeEach(() => {
    render(<SideBar title={title} directories={directories} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    return cleanup();
  });

  it('should render the texts of top level', () => {
    expect(screen.getByText(title)).toBeInTheDocument();
    for (const { title } of directories) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
  });

  it('should render the child texts after clicking the children', () => {
    const parentRoute = screen.getByText(directories[0].title);
    userEvent.click(parentRoute);
    for (const child of children) {
      expect(screen.getByText(child.title)).toBeInTheDocument();
    }
  });
});
