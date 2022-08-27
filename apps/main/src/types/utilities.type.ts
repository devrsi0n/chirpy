export type Nullable<T extends object> = {
  [P in keyof T]?: T[P] | null | undefined;
};
