// TODO: this will be a page to show all the voyages, links to signups, checkin etc
import ScheduleTable from '@/components/schedule/ScheduleTable';
import AirtableLinkButton from '@/components/ui/navigation/AirtableLinkButton';
import H1 from '@/components/ui/typography/h1';
import { getATBaseURL } from '@/lib/getAirtableUrls';
import { getVoyageSchedule } from '@/services/schedule';

const VoyageSchedule = async () => {
  const schedule = await getVoyageSchedule();

  // TODO make new component for errors
  if (!schedule.success) {
    return <div>Error fetching Schedule</div>;
  }
  return (
    <>
      <AirtableLinkButton
        path={getATBaseURL('schedule')}
        label="Go to Schedule Table in Airtable"
      />
      <H1>Voyage Schedule</H1>
      <ScheduleTable records={schedule.data} />
    </>
  );
};

export default VoyageSchedule;
