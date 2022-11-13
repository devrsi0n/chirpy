import { screen } from '@testing-library/react';
import * as nextThemesModule from 'next-themes';

import { ThemeEditor } from '..';
import { pageRender } from '../../../__tests__/fixtures/page-render';

const PROJECT = {
  id: 'test-id',
  name: 'test-name',
  domain: 'localhost',
};

jest.spyOn(nextThemesModule, 'useTheme').mockReturnValue({
  resolvedTheme: 'system',
} as any);

describe('ThemeEditor', () => {
  beforeEach(() => {
    pageRender(
      <ThemeEditor project={PROJECT} buildDate={new Date().toISOString()} />,
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
