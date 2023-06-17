import { Obj2Tuple, Union2Obj } from './utils';

export type TopLocationsData = {
  location: string;
  visits: number;
  hits: number;
};

export const TopLocationsSorting = {
  Visitors: 'visits',
  Pageviews: 'hits',
} as const;

export type TopLocationsSortingValue =
  (typeof TopLocationsSorting)[keyof typeof TopLocationsSorting];
export type TopLocationsSortingValueTuple = Obj2Tuple<
  Union2Obj<TopLocationsSortingValue>
>;

export type TopLocation = {
  location: string;
  shortLocation: string;
  visits: number;
  hits: number;
};
