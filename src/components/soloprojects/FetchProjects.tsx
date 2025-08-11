import ClientDateTime from '@/components/ClientDateTime';
import SoloProjectTable from '@/components/soloprojects/soloProjectTable';
import { Card, CardContent } from '@/components/ui/card';
import AirtableLinkButton from '@/components/ui/navigation/AirtableLinkButton';
import { getATBaseURL } from '@/lib/getAirtableUrls';
import { RefreshData } from '@/lib/RefreshData';
import { getSoloProjectsByStatus } from '@/services/soloProjects';
import { revalidatePath } from 'next/cache';

const FetchProjects = async ({
  status = 'Waiting Eval',
  noRecordMessage = 'No record found',
}: {
  status?: string;
  noRecordMessage?: string;
}) => {
  const records = await getSoloProjectsByStatus(status);

  async function refreshRecords() {
    'use server';
    revalidatePath('/');
  }

  return (
    <div className="flex flex-col gap-5 mb-10">
      <AirtableLinkButton
        path={getATBaseURL('solo-project')}
        label="Go to Solo Project Table in Airtable"
      />
      {records.length === 0 ? (
        <Card className="w-[380px] pt-5 flex items-center justify-center m-auto">
          <CardContent>{noRecordMessage}</CardContent>
        </Card>
      ) : (
        <>
          <SoloProjectTable
            records={records}
            baseUrl={getATBaseURL('solo-project')}
          />
        </>
      )}
      <RefreshData
        ms={10 * 60 * 1000}
        refreshAction={refreshRecords}
      />
      <div className="self-center text-sm text-gray-500">
        Last Refresh: <ClientDateTime />
      </div>
    </div>
  );
};

export default FetchProjects;
