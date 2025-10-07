import { FinanceRevenue } from '@/types/FinanceRevenueType';
import { createColumnHelper } from '@tanstack/table-core';

const columnHelper = createColumnHelper<FinanceRevenue>();

export const paymentColDef = [
  columnHelper.accessor(
    (row) => row.fields['Transaction Date'],
    {
      id: 'date',
      header: 'Date',
    }
  ),
  columnHelper.accessor((row) => row.fields['Product'], {
    id: 'product',
    header: 'Product',
  }),
  columnHelper.accessor(
    (row) => row.fields['Certificate Voyage'],
    {
      id: 'voyageCertificate',
      header: 'Voyage Certificate',
    }
  ),
];
