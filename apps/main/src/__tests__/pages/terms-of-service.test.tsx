import { cleanup, screen } from '@testing-library/react';

import TermsOfService, { getStaticProps } from '../../pages/terms-of-service';
import { pageRender } from '../fixtures/page-render';

describe('TermsOfService page', () => {
  beforeEach(async () => {
    const { props } = (await getStaticProps({})) as any;
    pageRender(<TermsOfService {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    return cleanup();
  });

  it('should render the title', () => {
    expect(screen.getAllByText(/terms of servic/i)).toHaveLength(3);
  });
});
