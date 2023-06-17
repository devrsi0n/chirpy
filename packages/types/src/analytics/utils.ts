export type Union2Obj<U extends string> = {
  [key in U]: Union2Obj<Exclude<U, key>>;
};
export type Obj2Tuple<O extends {}> = {} extends O
  ? []
  : {
      // @ts-expect-error
      [key in keyof O]: [key, ...Obj2Tuple<O[key]>];
    }[keyof O];
