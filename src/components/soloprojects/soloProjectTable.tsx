'use client';

import StandardReactTable from '@/components/react-table/StandardReactTable';
import { columnDef } from '@/components/soloprojects/columnDef';
import { SoloProjectSubmission } from '@/types/SoloProjectTypes';
import { useReactTable } from '@tanstack/react-table';
import { getCoreRowModel } from '@tanstack/table-core';
import { useSession } from 'next-auth/react';

const SoloProjectTable = ({
  records,
  baseUrl,
}: {
  records: SoloProjectSubmission[];
  baseUrl: string;
}) => {
  const { data: sessionData } = useSession();
  const userRole = sessionData?.user?.roles || [];
  const isAdmin = userRole.includes('admin');

  const spTable = useReactTable<SoloProjectSubmission>({
    data: records,
    columns: columnDef(baseUrl, isAdmin),
    getCoreRowModel: getCoreRowModel<SoloProjectSubmission>(),
  });

  return <StandardReactTable table={spTable} />;
};

export default SoloProjectTable;
