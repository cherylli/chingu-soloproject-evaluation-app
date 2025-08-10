'use client';

import StandardReactTable from '@/components/react-table/StandardReactTable';
import { tierMismatchColumnDef } from '@/components/soloprojects/tiers/tierMismatchColumnDef';
import { SoloProjectSubmission, SoloProjectTier } from '@/types/SoloProjectTypes';
import { useReactTable } from '@tanstack/react-table';
import { getCoreRowModel } from '@tanstack/table-core';
import { useState } from 'react';

const TierMismatchTable = ({ records }: { records: SoloProjectSubmission[] }) => {
  const [data, setData] = useState(records);

  const refreshRow = (rowId: string, newTier: SoloProjectTier) => {
    console.log(rowId, newTier);
    setData((prev) =>
      prev.map((row) =>
        row.id === rowId
          ? {
              ...row,
              fields: {
                ...row.fields,
                Tier: newTier,
              },
            }
          : row
      )
    );
  };

  const table = useReactTable<SoloProjectSubmission>({
    data,
    columns: tierMismatchColumnDef(refreshRow),
    getCoreRowModel: getCoreRowModel<SoloProjectSubmission>(),
  });

  return <StandardReactTable table={table} />;
};

export default TierMismatchTable;
