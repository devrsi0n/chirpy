export type ViewBarType = `${ViewType}Bar`;
export type ViewType = 'pv' | 'uv';

export type PageView = {
  date: string;
} & Record<ViewBarType, number>;
