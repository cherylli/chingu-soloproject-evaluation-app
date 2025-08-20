'use client';

import { appColDef } from '@/components/members/appColDef';
import MemberDetails from '@/components/members/MemberDetails';
import { spColDef } from '@/components/members/spColDef';
import { ColumnToggle } from '@/components/members/TableColumnToggle';
import { vsColDef } from '@/components/members/vsColDef';
import StandardReactTable from '@/components/react-table/StandardReactTable';
import H1 from '@/components/ui/typography/h1';
import { Context } from '@/types';
import { Application } from '@/types/ApplicationTypes';
import type { MemberDetailsType } from '@/types/MemberTypes';
import { SoloProjectSubmission } from '@/types/SoloProjectTypes';
import { VoyageSignup } from '@/types/VoyageSignupTypes';
import {
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { getCoreRowModel } from '@tanstack/table-core';
import { useState } from 'react';

const MemberProfile = ({
  memberDetails,
  atBaseUrls,
}: {
  memberDetails: MemberDetailsType;
  atBaseUrls: Partial<Record<Context, string>>;
}) => {
  const [appColVis, setAppColVis] = useState({});
  const [vsColVis, setVsColVis] = useState<{}>({
    Email: false,
    'Discord Name': false,
  });
  const [spColVis, setSpColVis] = useState<{}>({
    Email: false,
    'Discord Name': false,
  });
  const [vsSorting, setVsSorting] = useState<SortingState>([
    { id: 'Timestamp', desc: true },
  ]);
  const [spSorting, setSpSorting] = useState<SortingState>([
    { id: 'Timestamp', desc: true },
  ]);

  const appTable = useReactTable<Application>({
    data: memberDetails.applications,
    columns: appColDef(atBaseUrls['application'] ?? '#'),
    getCoreRowModel: getCoreRowModel<Application>(),
    state: {
      columnVisibility: appColVis,
    },
    onColumnVisibilityChange: setAppColVis,
    onSortingChange: setVsSorting,
  });
  const vsTable = useReactTable<VoyageSignup>({
    data: memberDetails.voyageSignups,
    columns: vsColDef(atBaseUrls['voyage-signup'] ?? '#'),
    getCoreRowModel: getCoreRowModel<VoyageSignup>(),
    getSortedRowModel: getSortedRowModel<VoyageSignup>(),
    state: {
      columnVisibility: vsColVis,
      sorting: vsSorting,
    },
    onColumnVisibilityChange: setVsColVis,
  });
  const spTable = useReactTable<SoloProjectSubmission>({
    data: memberDetails.soloProjects,
    columns: spColDef(atBaseUrls['solo-project'] ?? '#'),
    getCoreRowModel:
      getCoreRowModel<SoloProjectSubmission>(),
    getSortedRowModel:
      getSortedRowModel<SoloProjectSubmission>(),
    state: {
      columnVisibility: spColVis,
      sorting: spSorting,
    },
    onColumnVisibilityChange: setSpColVis,
  });

  return (
    <div>
      <MemberDetails memberDetails={memberDetails} />
      <H1>Voyage Signups</H1>
      <ColumnToggle
        columns={[
          vsTable.getColumn('Email')!,
          vsTable.getColumn('Discord Name')!,
        ]}
      />
      <StandardReactTable table={vsTable} />
      <H1>Solo Projects</H1>
      <ColumnToggle
        columns={[
          spTable.getColumn('Email')!,
          spTable.getColumn('Discord Name')!,
        ]}
      />
      <StandardReactTable table={spTable} />
      <H1>Applications</H1>
      <StandardReactTable table={appTable} />
    </div>
  );
};

export default MemberProfile;
