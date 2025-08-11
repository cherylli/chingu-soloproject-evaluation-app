'use client';

import { appColDef } from '@/components/members/appColDef';
import { spColDef } from '@/components/members/spColDef';
import { vsColDef } from '@/components/members/vsColDef';
import StandardReactTable from '@/components/react-table/StandardReactTable';
import H1 from '@/components/ui/typography/h1';
import { Context } from '@/types';
import { Application } from '@/types/ApplicationTypes';
import type { MemberDetails } from '@/types/MemberTypes';
import { SoloProjectSubmission } from '@/types/SoloProjectTypes';
import { VoyageSignup } from '@/types/VoyageSignupTypes';
import { useReactTable } from '@tanstack/react-table';
import { getCoreRowModel } from '@tanstack/table-core';

const MemberDetails = ({
  memberDetails,
  atBaseUrls,
}: {
  memberDetails: MemberDetails;
  atBaseUrls: Partial<Record<Context, string>>;
}) => {
  const appTable = useReactTable<Application>({
    data: memberDetails.applications,
    columns: appColDef(atBaseUrls['application'] ?? '#'),
    getCoreRowModel: getCoreRowModel<Application>(),
  });
  const vsTable = useReactTable<VoyageSignup>({
    data: memberDetails.voyageSignups,
    columns: vsColDef(atBaseUrls['voyage-signup'] ?? '#'),
    getCoreRowModel: getCoreRowModel<VoyageSignup>(),
  });
  const spTable = useReactTable<SoloProjectSubmission>({
    data: memberDetails.soloProjects,
    columns: spColDef(atBaseUrls['solo-project'] ?? '#'),
    getCoreRowModel: getCoreRowModel<SoloProjectSubmission>(),
  });
  return (
    <div>
      <H1>Voyage Signups</H1>
      <StandardReactTable table={vsTable} />
      <H1>Solo Projects</H1>
      <StandardReactTable table={spTable} />
      <H1>Applications</H1>
      <StandardReactTable table={appTable} />
    </div>
  );
};

export default MemberDetails;
