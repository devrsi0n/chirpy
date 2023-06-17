export type TopLocationsData = {
  location: string;
  visits: number;
  hits: number;
};

export const TopLocationsSorting = {
  Visitors: 'visits',
  Pageviews: 'hits',
} as const;

type Uion2Obj<U extends string> = {
  [key in U]: Uion2Obj<Exclude<U, key>>;
};

type Obj2Tuple<O extends object> = object extends O
  ? []
  : {
      [key in keyof O]: [key, ...Obj2Tuple<O[key]>];
    }[keyof O];

export type TopLocationsSortingValue =
  (typeof TopLocationsSorting)[keyof typeof TopLocationsSorting];
export type TopLocationsSortingValueTuple = Obj2Tuple<
  Uion2Obj<TopLocationsSortingValue>
>;

export type TopLocation = {
  location: string;
  shortLocation: string;
  visits: number;
  hits: number;
};
