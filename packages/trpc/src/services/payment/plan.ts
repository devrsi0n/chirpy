import { Plan as PlanUnion } from '@prisma/client';

type PlanPrice = {
  amount: number;
  priceId: string;
  pageviews: number;
  maxProjectNum: number;
};

export type Plan = {
  name: 'Hobby' | 'Pro' | 'Enterprise';
  type: PlanUnion;
  price: {
    test: PlanPrice;
    production: PlanPrice;
  };
};

export const PLANS = [
  {
    name: 'Hobby',
    type: 'HOBBY',
    price: {
      test: {
        amount: 0,
        // No needed
        priceId: '',
        pageviews: 1000,
        maxProjectNum: 1,
      },
      production: {
        amount: 0,
        // No needed
        priceId: '',
        pageviews: 1000,
        maxProjectNum: 1,
      },
    },
  },
  {
    name: 'Pro',
    type: 'PRO',
    price: {
      test: {
        amount: 6,
        priceId: 'price_1NZ7FiFkzx77ql6gW7zIxmDK',
        pageviews: 1000,
        maxProjectNum: 3,
      },
      production: {
        amount: 6,
        priceId: 'price_1Nc0cgFkzx77ql6gxoD33Lv0',
        pageviews: 10_000,
        maxProjectNum: 10,
      },
    },
  },
  {
    name: 'Enterprise',
    type: 'ENTERPRISE',
    price: {
      test: {
        amount: 99,
        priceId: '',
        pageviews: 1000,
        maxProjectNum: 9,
      },
      production: {
        amount: 99,
        priceId: '',
        pageviews: 9_999_999,
        maxProjectNum: 99,
      },
    },
  },
] satisfies Plan[];

const getEnv = () =>
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' ? 'production' : 'test';

export function getPlanByPriceId(priceId: string) {
  return PLANS.find((p) => p.price[getEnv()].priceId === priceId);
}

export function getPlanPrice(type: PlanUnion) {
  const plan = PLANS.find((p) => p.type === type);
  return plan!.price[getEnv()];
}

export function getPriceId(type: PlanUnion) {
  const plan = PLANS.find((p) => p.type === type);
  return plan!.price[getEnv()].priceId;
}
