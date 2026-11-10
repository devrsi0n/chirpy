import { screen } from '@testing-library/react';

import { ThemeEditor } from '..';
import { pageRender } from '../../../__tests__/fixtures/page-render';

const PROJECT = {
  id: 'test-id',
  name: 'test-name',
  domain: 'localhost',
};

jest.mock('next-themes', () => ({
  ...jest.requireActual('next-themes'),
  useTheme: () => ({ resolvedTheme: 'system' }),
}));

describe('ThemeEditor', () => {
  beforeEach(() => {
    pageRender(
      <ThemeEditor
        project={PROJECT}
        username="jest"
        buildDate={new Date().toISOString()}
      />,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the editor and the preview widget', () => {
    expect(
      screen.getByRole('button', {
        name: 'Primary color picker',
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole('button', {
        name: 'Post',
      }),
    ).toBeTruthy();
  });
});
