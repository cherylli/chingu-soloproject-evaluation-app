'use client';

import { appColDef } from '@/components/members/appColDef';
import MemberDetails from '@/components/members/MemberDetails';
import { spColDef } from '@/components/members/spColDef';
import { vsColDef } from '@/components/members/vsColDef';
import StandardReactTable from '@/components/react-table/StandardReactTable';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import H1 from '@/components/ui/typography/h1';
import { Context } from '@/types';
import { Application } from '@/types/ApplicationTypes';
import type { MemberDetailsType } from '@/types/MemberTypes';
import { SoloProjectSubmission } from '@/types/SoloProjectTypes';
import { VoyageSignup } from '@/types/VoyageSignupTypes';
import { useReactTable } from '@tanstack/react-table';
import {
  Column,
  getCoreRowModel,
} from '@tanstack/table-core';
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

  const appTable = useReactTable<Application>({
    data: memberDetails.applications,
    columns: appColDef(atBaseUrls['application'] ?? '#'),
    getCoreRowModel: getCoreRowModel<Application>(),
    state: {
      columnVisibility: appColVis,
    },
    onColumnVisibilityChange: setAppColVis,
  });
  const vsTable = useReactTable<VoyageSignup>({
    data: memberDetails.voyageSignups,
    columns: vsColDef(atBaseUrls['voyage-signup'] ?? '#'),
    getCoreRowModel: getCoreRowModel<VoyageSignup>(),
    state: {
      columnVisibility: vsColVis,
    },
    onColumnVisibilityChange: setVsColVis,
  });
  const spTable = useReactTable<SoloProjectSubmission>({
    data: memberDetails.soloProjects,
    columns: spColDef(atBaseUrls['solo-project'] ?? '#'),
    getCoreRowModel:
      getCoreRowModel<SoloProjectSubmission>(),
  });

  const VsColumnToggle = ({
    columns,
  }: {
    columns: Column<VoyageSignup>[];
  }) => {
    return (
      <div className="flex gap-2">
        {columns.map((column) => {
          return (
            <div
              key={column.id}
              className="flex items-center gap-2"
            >
              <Checkbox
                id={`vs-${column.id}`}
                checked={column.getIsVisible()}
                onCheckedChange={(e) =>
                  column.toggleVisibility()
                }
              />
              <Label htmlFor={`vs-${column.id}`}>
                {column.id}
              </Label>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <MemberDetails memberDetails={memberDetails} />
      <H1>Voyage Signups</H1>
      <VsColumnToggle
        columns={[
          vsTable.getColumn('Email')!,
          vsTable.getColumn('Discord Name')!,
        ]}
      />
      <StandardReactTable table={vsTable} />
      <H1>Solo Projects</H1>
      <StandardReactTable table={spTable} />
      <H1>Applications</H1>
      <StandardReactTable table={appTable} />
    </div>
  );
};

export default MemberProfile;
