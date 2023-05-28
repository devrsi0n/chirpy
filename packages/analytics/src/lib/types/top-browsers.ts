import { Color } from '@tremor/react';

export type BrowserType = 'chrome' | 'firefox' | 'safari' | 'opera' | 'ie';

export type TopBrowsersData = {
  browser: BrowserType;
  visits: number;
  hits: number;
};

export type TopBrowser = {
  browser: string;
  visits: number;
};

export type TopBrowsers = {
  data: TopBrowser[];
};
