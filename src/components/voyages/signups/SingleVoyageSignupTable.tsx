'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { singleVoyageColumnDef } from '@/components/voyages/signups/singleVoyageColumnDef';
import { githubTeamUrl } from '@/lib/urls';
import { voyageStatusColors } from '@/styles/voyageStatus';
import { VoyageSignup } from '@/types/VoyageSignupTypes';
import {
  flexRender,
  getGroupedRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { getCoreRowModel } from '@tanstack/table-core';
import {
  ChevronDown,
  ChevronRight,
  ExternalLinkIcon,
  MoreVertical,
  SquareChevronRight,
} from 'lucide-react';
import { Fragment, useMemo, useState } from 'react';

const SingleVoyageSignupTable = ({
  records,
  atBaseUrl,
}: {
  records: VoyageSignup[];
  atBaseUrl: string;
}) => {
  const [grouping, setGrouping] = useState(['teamNum']);
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'teamNum', desc: false },
  ]);
  const columnVisibility = useMemo(
    () => ({ teamNum: false }),
    []
  );

  const columns = singleVoyageColumnDef(atBaseUrl);

  const table = useReactTable<VoyageSignup>({
    data: records,
    columns,
    state: {
      grouping,
      sorting,
      columnVisibility,
    },
    autoResetAll: false,
    getCoreRowModel: getCoreRowModel<VoyageSignup>(),
    getGroupedRowModel: getGroupedRowModel<VoyageSignup>(),
    getSortedRowModel: getSortedRowModel<VoyageSignup>(),
  });

  return (
    <Table className="border">
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
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => {
          // Grouping row (category header)
          if (row.getIsGrouped()) {
            const activeNum = row.subRows.filter(
              (sr) => sr.original.fields.Status === 'Active'
            ).length;

            return (
              <Fragment key={row.id}>
                <TableRow className="cursor-pointer">
                  <TableCell colSpan={columns.length}>
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                        onClick={row.getToggleExpandedHandler()}
                      >
                        {row.getIsExpanded() ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </Button>
                      <strong>
                        <span className="text-green-700">{`${row.getGroupingValue(row.groupingColumnId!) ?? ''}`}</span>
                        <span className="ml-5 text-green-700/60">{`( ${activeNum} / ${row.subRows.length} )`}</span>
                      </strong>
                      {row.original.fields['Team No.'] && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 p-0 ml-4"
                            >
                              <span className="sr-only">
                                Open menu
                              </span>
                              <MoreVertical />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <a
                              href={githubTeamUrl(
                                row.original.fields
                              )}
                              target="_blank"
                            >
                              <DropdownMenuLabel className="flex items-center gap-2">
                                <ExternalLinkIcon /> Github
                                repo
                              </DropdownMenuLabel>
                            </a>
                            <a
                              href={`/admin/voyage/${row.original.fields.Voyage.slice(1)}/team/${row.original.fields['Team No.']}`}
                            >
                              <DropdownMenuLabel className="flex items-center gap-2">
                                <SquareChevronRight /> Team
                                Page
                              </DropdownMenuLabel>
                            </a>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                {row.getIsExpanded() &&
                  row.subRows.map((subRow) => {
                    const rowClassByStatus =
                      voyageStatusColors[
                        subRow.original.fields.Status
                      ]?.text || '';
                    return (
                      <TableRow
                        key={subRow.id}
                        className={rowClassByStatus}
                      >
                        {subRow
                          .getVisibleCells()
                          .map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                      </TableRow>
                    );
                  })}
              </Fragment>
            );
          }

          return (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default SingleVoyageSignupTable;
