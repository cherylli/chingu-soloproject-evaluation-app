'use client';

import CheckInDialogContent from '@/components/checkins/CheckInDialogContent';
import { columnDef } from '@/components/checkins/columnDef';
import Filter from '@/components/react-table/Filter';
import PaginationButtons from '@/components/ui/buttons/PaginationButtons';
import {
  Dialog,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { progressColor } from '@/styles/checkin/progress';
import { CheckIn } from '@/types/CheckinTypes';
import {
  flexRender,
  useReactTable,
} from '@tanstack/react-table';
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  Row,
} from '@tanstack/table-core';
import { useState } from 'react';

const CheckinTable = ({
  records,
}: {
  records: CheckIn[];
}) => {
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>([]);

  const table = useReactTable<CheckIn>({
    data: records,
    columns: columnDef,
    state: {
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel<CheckIn>(),
    getPaginationRowModel: getPaginationRowModel<CheckIn>(),
    getFilteredRowModel: getFilteredRowModel<CheckIn>(),
    getFacetedUniqueValues:
      getFacetedUniqueValues<CheckIn>(),
  });

  return (
    <div className="mt-6 rounded-lg overflow-hidden w-[90%] mx-auto">
      <Table className="border mb-4">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  <div>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </div>
                  <>
                    {header.column.getCanFilter() ? (
                      <div className="grid place-content-center">
                        <Filter column={header.column} />
                      </div>
                    ) : null}
                  </>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <Dialog key={`${row.id}-dialog`}>
              <TableRow
                key={row.id}
                className={`${progressColor[row.original.fields['Progress Rating']]?.border}`}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <DialogTrigger
                      key={`${cell.id}-dialog-trigger`}
                      asChild
                    >
                      <button className="w-full text-left">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </button>
                    </DialogTrigger>
                  </TableCell>
                ))}
              </TableRow>
              <CheckInDialogContent
                record={row as Row<CheckIn>}
              />
            </Dialog>
          ))}
        </TableBody>
      </Table>
      <PaginationButtons table={table} />
    </div>
  );
};

export default CheckinTable;
