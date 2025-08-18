import AirtableLinkCell from '@/components/react-table/cells/AirtableLink';
import Role from '@/components/react-table/cells/Role';
import TooltipWithLink from '@/components/react-table/cells/TooltipWithLink';
import ReactTableVoyageStatusCell from '@/components/react-table/cells/VoyageStatus';
import { VoyageSignup } from '@/types/VoyageSignupTypes';
import { createColumnHelper } from '@tanstack/table-core';

const columnHelper = createColumnHelper<VoyageSignup>();

// voyage Signup column Definitions for Member Profile Page
export const vsColDef = (baseURL: string) => [
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
  columnHelper.accessor((row) => row.fields['Voyage'], {
    id: 'Voyage',
    header: 'Voyage',
    cell: ({ row }) => {
      const voyageNum = row.original.fields.Voyage.slice(1);
      return (
        <TooltipWithLink
          tooltip={`Go to V${voyageNum}`}
          link={`/admin/voyage/${voyageNum}/signups`}
          linkText={`V${voyageNum}`}
        />
      );
    },
  }),
  columnHelper.accessor((row) => row.fields['Tier'], {
    id: 'Tier',
    header: 'Tier',
    cell: ({ row }) => {
      return <span>{row.original.fields['Tier'][5]}</span>;
    },
  }),
  columnHelper.accessor((row) => row.fields['Team No.'], {
    id: 'Team No.',
    header: 'Team No.',
    cell: ({ row }) => {
      const voyageNum = row.original.fields.Voyage.slice(1);
      const teamNum = row.original.fields['Team No.'];
      return (
        <TooltipWithLink
          tooltip={`Go to V${voyageNum} Team ${teamNum}`}
          link={`/admin/voyage/${voyageNum}/team/${teamNum}`}
          linkText={teamNum}
        />
      );
    },
  }),
  columnHelper.accessor((row) => row.fields['Status'], {
    id: 'Status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <ReactTableVoyageStatusCell
          status={row.original.fields['Status']}
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
      <Role
        role={row.original.fields['Role']}
        status={row.original.fields['Status']}
      />
    ),
  }),
  columnHelper.accessor((row) => row.fields['Role Type'], {
    id: 'Role Type',
  }),
];
