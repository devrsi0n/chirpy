import { Obj2Tuple, Union2Obj } from './utils';

export type TopPagesData = {
  pathname: string;
  visits: number;
  hits: number;
};

export const TopPagesSorting = {
  Visitors: 'visits',
  Pageviews: 'hits',
} as const;

export type TopPagesSortingValue =
  (typeof TopPagesSorting)[keyof typeof TopPagesSorting];
export type TopPagesSortingValueTuple = Obj2Tuple<
  Union2Obj<TopPagesSortingValue>
>;
