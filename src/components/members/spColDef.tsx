import AirtableLinkCell from '@/components/react-table/cells/AirtableLink';
import ReactTableRoleCell from '@/components/react-table/cells/Role';
import { SoloProjectSubmission } from '@/types/SoloProjectTypes';
import { createColumnHelper } from '@tanstack/table-core';

const columnHelper =
  createColumnHelper<SoloProjectSubmission>();

export const spColDef = (baseURL: string) => [
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
      id: 'Discord Name',
      header: 'Discord Name',
    }
  ),
  columnHelper.accessor((row) => row.fields['Email'], {
    id: 'Email',
    header: 'Email',
  }),
  columnHelper.accessor((row) => row.fields['Role'], {
    id: 'Role',
    header: 'Role',
    cell: ({ row }) => (
      <ReactTableRoleCell
        role={row.original.fields['Role']}
      />
    ),
  }),
  columnHelper.accessor((row) => row.fields['Role Type'], {
    id: 'Role Type',
  }),
];
