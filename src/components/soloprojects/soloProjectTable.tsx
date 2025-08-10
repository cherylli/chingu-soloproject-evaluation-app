'use client';

import StandardReactTable from '@/components/react-table/StandardReactTable';
import { soloProjectColDef } from '@/components/soloprojects/soloProjectColDef';
import { useRoleCheck } from '@/hooks/useRoleCheck';
import { SoloProjectSubmission } from '@/types/SoloProjectTypes';
import { useReactTable } from '@tanstack/react-table';
import { getCoreRowModel } from '@tanstack/table-core';

const SoloProjectTable = ({
  records,
  baseUrl,
}: {
  records: SoloProjectSubmission[];
  baseUrl: string;
}) => {
  const { isAdmin } = useRoleCheck();

  const spTable = useReactTable<SoloProjectSubmission>({
    data: records,
    columns: soloProjectColDef(baseUrl, isAdmin),
    getCoreRowModel: getCoreRowModel<SoloProjectSubmission>(),
  });

  return <StandardReactTable table={spTable} />;
};

export default SoloProjectTable;
