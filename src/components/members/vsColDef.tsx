import AirtableLinkCell from '@/components/react-table/cells/AirtableLink';
import { VoyageSignup } from '@/types/VoyageSignupTypes';
import { createColumnHelper } from '@tanstack/table-core';

const columnHelper = createColumnHelper<VoyageSignup>();

export const vsColDef = (baseURL: string) => [
  columnHelper.display({
    id: 'Airtable Link',
    cell: ({ row }) => {
      return <AirtableLinkCell row={row} baseUrl={baseURL} />;
    },
  }),
  columnHelper.accessor((row) => row.fields['Discord Name'], {
    id: 'Discord Name',
    header: 'Discord Name',
  }),
  columnHelper.accessor((row) => row.fields['Email'], {
    id: 'Email',
    header: 'Email',
  }),
  columnHelper.accessor((row) => row.fields['Role'], {
    id: 'Role',
    header: 'Role',
    // TODO: update ReactTableRoleCell
    // cell: ({row}) =>
    //    <ReactTableRoleCell row={row} />
  }),
  columnHelper.accessor((row) => row.fields['Role Type'], {
    id: 'Role Type',
  }),
];
