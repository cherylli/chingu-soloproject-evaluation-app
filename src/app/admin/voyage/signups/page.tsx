import H1 from '@/components/ui/typography/h1';
import P from '@/components/ui/typography/p';
import VoyageSignupTable from '@/components/voyages/signups/VoyageSignupTable';
import { getATBaseURL } from '@/lib/getAirtableUrls';
import { getLastestVoyageSignups } from '@/services/voyages';

export const dynamic = 'force-dynamic';

const VoyageSignupPage = async () => {
  const signups = await getLastestVoyageSignups();

  if (!signups.success) {
    return <div>Error fetching signups</div>;
  }

  return (
    <>
      <H1>VoyageSignupPage - All latest signups</H1>
      <P>This page is still WIP. Currently just showing the latest 20 signups</P>
      <VoyageSignupTable records={signups.data} atBaseUrl={getATBaseURL('voyage-signup')} />
    </>
  );
};

export default VoyageSignupPage;
