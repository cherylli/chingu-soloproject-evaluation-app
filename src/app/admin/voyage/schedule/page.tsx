// TODO: this will be a page to show all the voyages, links to signups, checkin etc
import ScheduleTable from '@/components/schedule/ScheduleTable';
import H1 from '@/components/ui/typography/h1';
import { getSchedule } from '@/services/schedule';
import Link from 'next/link';

const VoyageSchedule = async () => {
  const schedule = await getSchedule();
  console.log(schedule);
  return (
    <>
      <H1>VoyageSchedule</H1>
      <Link href={`/admin/voyage/56/signups`}>V56</Link>
      <Link href={`/admin/voyage/57/signups`}>V57</Link>
      <div>{JSON.stringify(schedule)}</div>
      <ScheduleTable records={schedule.data} />
    </>
  );
};

export default VoyageSchedule;
