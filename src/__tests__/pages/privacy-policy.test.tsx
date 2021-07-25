import { cleanup, screen } from '@testing-library/react';

import PrivacyPolicy, { getStaticProps } from '../../pages/privacy-policy';
import { pageRender } from '../fixtures/page-render';

describe('PrivacyPolicy page', () => {
  beforeEach(async () => {
    const { props } = await getStaticProps();
    pageRender(<PrivacyPolicy {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    return cleanup();
  });

  it('should render the title', () => {
    expect(screen.queryByText(/privacy policy/i)).toBeInTheDocument();
  });
});
