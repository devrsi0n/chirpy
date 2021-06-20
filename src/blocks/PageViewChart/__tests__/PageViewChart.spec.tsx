import { render, screen } from '@testing-library/react';

import { PageViewChart, PageViewChartProps } from '../PageViewChart';

describe('PageViewChart', () => {
  beforeEach(() => {
    render(<PageViewChart project={project} />);
  });

  it('should render page view and visitor number', () => {
    expect(screen.queryByLabelText('Page views')?.textContent).toEqual('6');
    expect(screen.queryByLabelText('Visitors')?.textContent).toEqual('2');
  });

  it('should render svg chart', () => {
    const chart = screen.queryByLabelText('Page view chart') as unknown as SVGSVGElement;
    expect(chart).toBeTruthy();
  });
});

const project: PageViewChartProps['project'] = {
  id: 'project-id',
  name: 'test',
  domain: 'test.com',
  sessionsYesterday: [
    {
      events: [
        {
          created_at: '2021-06-19T02:11:28.167221+00:00',
        },
        {
          created_at: '2021-06-19T08:11:28.167221+00:00',
        },
        {
          created_at: '2021-06-19T18:11:28.167221+00:00',
        },
      ],
    },
    {
      events: [
        {
          created_at: '2021-06-19T04:02:28.167221+00:00',
        },
        {
          created_at: '2021-06-19T11:09:28.167221+00:00',
        },
        {
          created_at: '2021-06-19T21:52:28.167221+00:00',
        },
      ],
    },
  ],
  sessionsTwoDaysAgo: [
    {
      events: [
        {
          created_at: '2021-06-18T02:11:28.167221+00:00',
        },
        {
          created_at: '2021-06-18T08:11:28.167221+00:00',
        },
      ],
    },
    {
      events: [
        {
          created_at: '2021-06-18T04:02:28.167221+00:00',
        },
        {
          created_at: '2021-06-18T11:09:28.167221+00:00',
        },
      ],
    },
  ],
};
