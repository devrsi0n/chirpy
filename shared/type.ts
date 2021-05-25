export type Directory = {
  title: string;
  /**
   * Only files contains route
   */
  route?: string;
  /**
   * Only directory contains children
   */
  children?: Directory[];
};

export type FileStructure = {
  slug: string;
  path: string;
  ancestors?: string[];
};
