import { Schedule } from '@/types/ScheduleTypes';
import { createColumnHelper } from '@tanstack/table-core';
import Link from 'next/link';

export const columnHelper = createColumnHelper<Schedule>();

export const scheduleColDef = [
  columnHelper.accessor((row) => row.fields['Name'], {
    header: 'Name',
    cell: ({ row }) => (
      <Link href={`/admin/voyage/${row.original.fields['Name'].slice(1)}/signups`}>
        {row.original.fields['Name']}
      </Link>
    ),
  }),
  columnHelper.accessor((row) => row.fields['Solo Project Deadline'], {
    header: 'Solo Project Deadline',
  }),
  columnHelper.accessor((row) => row.fields['Start Date'], {
    header: 'Start Date',
  }),
  columnHelper.accessor((row) => row.fields['End Date'], {
    header: 'End Date',
  }),
];
