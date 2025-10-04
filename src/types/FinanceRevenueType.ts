export type FinanceRevenue = {
  id: string;
  fields: FinanceRevenueFields;
};
export type SubscriptionStatusType = 'Active' | 'Ended';
export type PaymentSourceType =
  | 'STRIPE'
  | 'DISCORD'
  | 'SCRIMBA'
  | 'BUY ME A COFFEE'
  | 'TAX REFUND'
  | 'GOFUNDME'
  | string;
export type ProductType =
  | 'MERCHANDISE'
  | 'DONATION'
  | 'ADJUSTMENT'
  | 'SUBSCRIPTION - Junior Professional'
  | 'SUBSCRIPTION - Professional'
  | 'SUBSCRIPTION - Senior Professional'
  | 'PRODUCT - Voyage Certificate'
  | 'AFFILIATE'
  | string;

export type FinanceRevenueFields = {
  'Payee Email': string;
  'Transaction Date': string;
  'Discord ID (from Applications)': string;
  'Subscription Status': SubscriptionStatusType[];
  'Payment Source': PaymentSourceType;
  Product: ProductType;
  'Certificate Voyage': string;
  'Payment Amount': number;
  'Transaction Fee': number;
  'Net Payment': number;
  'Refund Amount': number;
  'Month (from Formula)': string;
};

const financeRevenueSearchableFields = [
  'Payee Email',
  'Discord ID (from Applications)',
  'Subscription Status',
  'Payment Source',
  'Product',
  'Certificate Voyage',
] as const satisfies readonly (keyof FinanceRevenueFields)[];

export type FinanceRevenueSearchableFields =
  (typeof financeRevenueSearchableFields)[number];
