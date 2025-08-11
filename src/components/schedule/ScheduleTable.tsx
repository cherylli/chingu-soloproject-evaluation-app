'use client';

import StandardReactTable from '@/components/react-table/StandardReactTable';
import { scheduleColDef } from '@/components/schedule/scheduleColDef';
import { Schedule } from '@/types/ScheduleTypes';
import { useReactTable } from '@tanstack/react-table';
import { getCoreRowModel } from '@tanstack/table-core';

const ScheduleTable = ({ records }: { records: Schedule[] }) => {
  const columns = scheduleColDef;
  const table = useReactTable<Schedule>({
    data: records,
    columns,
    getCoreRowModel: getCoreRowModel<Schedule>(),
  });
  return <StandardReactTable table={table} />;
};

export default ScheduleTable;
