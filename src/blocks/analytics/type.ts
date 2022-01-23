import { Query } from './query';

export interface Site {
  domain: string;
  offset: string;
  hasGoals: boolean;
  insertedAt: string;
  embedded: boolean;
  background: string;
  selfhosted: boolean;
  cities: boolean;
}

export interface Goal {
  name: string;
  unique_conversions: number;
  total_conversions: number;
  conversion_rate: number;
  prop_names: string[];
}

export interface BreakDownItem extends Goal {
  //
}

export interface Props {
  query: Query;
  site: Site;
}
