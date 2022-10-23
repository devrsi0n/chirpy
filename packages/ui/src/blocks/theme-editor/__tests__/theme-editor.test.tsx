import { screen } from '@testing-library/react';
import * as nextThemesModule from 'next-themes';

import { pageRender } from '$/__tests__/fixtures/page-render';

import { ThemeEditor } from '..';

const PROJECT = {
  id: 'test-id',
  name: 'test-name',
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
        name: 'Click to expanded the color picker',
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole('button', {
        name: 'Post',
      }),
    ).toBeTruthy();
  });
});
