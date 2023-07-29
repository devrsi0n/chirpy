import { Plan as PlanUnion } from '@prisma/client';

export type Plan = {
  name: 'Hobby' | 'Pro';
  type: PlanUnion;
  quota: number;
  price: {
    amount: number;
    priceIds: {
      test: string;
      production: string;
    };
  };
};

export const PLANS = [
  {
    name: 'Hobby',
    type: 'HOBBY',
    quota: 5000,
    price: {
      amount: 0,
      priceIds: {
        test: '',
        production: '',
      },
    },
  },
  {
    name: 'Pro',
    type: 'PRO',
    quota: 10_000,
    price: {
      amount: 6,
      priceIds: {
        test: 'price_1NUUS1Fkzx77ql6gICFLZfyb',
        production: '',
      },
    },
  },
] satisfies Plan[];

const getEnv = () =>
  process.env.VERCEL_ENV === 'production' ? 'production' : 'test';

export function getPlanByPriceId(priceId: string) {
  return PLANS.find((p) => p.price.priceIds[getEnv()] === priceId);
}

export function getPriceIdByPlanName(name: (typeof PLANS)[number]['name']) {
  const plan = PLANS.find((p) => p.name === name);
  if (!plan) {
    return;
  }
  return plan.price.priceIds[getEnv()];
}

export function isNewCustomer(
  previousAttr:
    | {
        default_payment_method?: string;
        items?: {
          data?: {
            price?: {
              id?: string;
            }[];
          };
        };
      }
    | undefined,
) {
  let isNewCustomer = false;

  if (
    // if the project is upgrading from hobby to pro
    previousAttr?.default_payment_method
  ) {
    // if the project is upgrading from pro to enterprise
    const prevPriceId = previousAttr?.items?.data?.price?.[0]?.id;
    if (prevPriceId && getPlanByPriceId(prevPriceId)?.type === 'PRO') {
      isNewCustomer = true;
    }
  } else {
    isNewCustomer = true;
  }

  return isNewCustomer;
}
