export type RequestProps = {
  path: string;
  searchParams?: Record<string, string>;
  method?: 'GET' | 'POST' | 'DELETE';
  body?: Record<string, any>;
};
export type LinkPageAuthorParams = {
  pageUrl: string;
  email: string;
  name: string;
};

type Page = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  url: string;
  title: string | null;
  projectId: string;
  authorId: string | null;
};

export type PageResult = {
  comments: {
    id: string;
  }[];
} & Page;

export type Project = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  teamId: string | null;
  userId: string | null;
  theme: Record<string, any>;
  domain: string;
  queryParameters: string | null;
};

export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  username: string | null;
  bio: string | null;
  website: string | null;
  twitterUserName: string | null;
  plan: 'HOBBY' | 'PRO' | 'ENTERPRISE' | null;
  billingCycleDay: number | null;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
};
