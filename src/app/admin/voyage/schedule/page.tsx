// TODO: this will be a page to show all the voyages, links to signups, checkin etc
import ScheduleTable from '@/components/schedule/ScheduleTable';
import H1 from '@/components/ui/typography/h1';
import { getATBaseURL } from '@/lib/getAirtableUrls';
import { getVoyageSchedule } from '@/services/schedule';
import Link from 'next/link';

const VoyageSchedule = async () => {
  const schedule = await getVoyageSchedule();

  // TODO make new component for errors
  if (!schedule.success) {
    return <div>Error fetching Schedule</div>;
  }
  return (
    <>
      <H1>VoyageSchedule</H1>
      <Link href={`/admin/voyage/56/signups`}>V56</Link>
      <Link href={`/admin/voyage/57/signups`}>V57</Link>
      <br />
      <a href={`${getATBaseURL('schedule')}`} target="_blank">
        Go to Airtable Schedule Table
      </a>
      <ScheduleTable records={schedule.data} />
    </>
  );
};

export default VoyageSchedule;
