import { getATBaseURL } from '@/lib/getAirtableUrls';

export const dynamic = 'force-dynamic';

// TODO: move under voyage
import H1 from '@/components/ui/typography/h1';

import CheckinTable from '@/components/checkins/checkinTable';
import AirtableLinkButton from '@/components/ui/navigation/AirtableLinkButton';
import { getLastestCheckIns } from '@/services/checkins';

const VoyageCheckIn = async () => {
  const checkin = await getLastestCheckIns();

  return (
    <>
      <AirtableLinkButton
        path={getATBaseURL('voyage-checkin')}
        label="Go to Voyage Check in Table in Airtable"
      />
      <H1>Latest 100 Voyage Check-ins</H1>
      <CheckinTable records={checkin} />
    </>
  );
};

export default VoyageCheckIn;
