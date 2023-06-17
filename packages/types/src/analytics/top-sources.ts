export type TopSource = {
  referrer: string;
  visits: number;
  href?: string;
};

export type TopSources = {
  data: TopSource[];
  refs: string[];
  visits: number[];
};
