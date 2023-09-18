export type Union2Obj<U extends string> = {
  [key in U]: Union2Obj<Exclude<U, key>>;
};

export type Obj2Tuple<O extends Record<string, any>> = Record<
  string,
  any
> extends O
  ? []
  : {
      [key in keyof O]: [key, ...Obj2Tuple<O[key]>];
    }[keyof O];
