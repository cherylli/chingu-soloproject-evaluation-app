import AirtableLinkCell from '@/components/react-table/cells/AirtableLink';
import Role from '@/components/react-table/cells/Role';
import { VoyageSignup } from '@/types/VoyageSignupTypes';
import { createColumnHelper } from '@tanstack/table-core';

const columnHelper = createColumnHelper<VoyageSignup>();

export const singleVoyageColumnDef = (
  baseURL: string,
  withGrouping: boolean = true
) => [
  ...(withGrouping
    ? [
        columnHelper.accessor(
          (row) => row.fields['Team No.'],
          {
            id: 'teamNum',
            header: 'Team',
            enableGrouping: true,
            enableSorting: true,
            getGroupingValue: (row) =>
              `${row.fields['Team Name']} - ${row.fields['Team No.'] || 'no team'}`,
            // TODO: show how many active in the team
          }
        ),
      ]
    : []),
  columnHelper.display({
    id: 'Airtable Link',
    cell: ({ row }) => {
      return (
        <AirtableLinkCell
          row={row}
          baseUrl={baseURL}
        />
      );
    },
  }),
  columnHelper.accessor(
    (row) => row.fields['Discord Name'],
    {
      header: 'Discord Name',
    }
  ),
  columnHelper.accessor((row) => row.fields['GitHub ID'], {
    header: 'Github Id',
  }),
  columnHelper.accessor((row) => row.fields['Status'], {
    header: 'Status',
  }),
  columnHelper.accessor((row) => row.fields['Role'], {
    header: 'Role',
    cell: ({ row }) => (
      <Role
        role={row.original.fields['Role']}
        status={row.original.fields['Status']}
      />
    ),
  }),
];
