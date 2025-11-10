'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { singleVoyageColumnDef } from '@/components/voyages/signups/singleVoyageColumnDef';
import { rowClassByStatus } from '@/styles/voyageStatus';
import { VoyageSignup } from '@/types/VoyageSignupTypes';
import {
  flexRender,
  useReactTable,
} from '@tanstack/react-table';
import { getCoreRowModel } from '@tanstack/table-core';

const VoyageTeamPageMemberTable = ({
  records,
  atBaseUrl,
}: {
  records: VoyageSignup[];
  atBaseUrl: string;
}) => {
  const columns = singleVoyageColumnDef(atBaseUrl, false);

  const table = useReactTable<VoyageSignup>({
    data: records,
    columns,
    getCoreRowModel: getCoreRowModel<VoyageSignup>(),
  });
  return (
    <Table className="border">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            className={rowClassByStatus(
              row.original.fields.Status
            )}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default VoyageTeamPageMemberTable;
