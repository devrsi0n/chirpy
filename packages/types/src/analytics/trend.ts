export type TrendData = {
  t: string;
  visits: number;
};

export type Trend = {
  visits: number[];
  dates: string[];
  totalVisits: number;
  data: TrendData[];
};
