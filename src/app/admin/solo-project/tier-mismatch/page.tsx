import TierMismatchTable from '@/components/soloprojects/tiers/TierMismatchTable';
import AirtableLinkButton from '@/components/ui/navigation/AirtableLinkButton';
import H1 from '@/components/ui/typography/h1';
import P from '@/components/ui/typography/p';
import { getATBaseURL } from '@/lib/getAirtableUrls';
import { getTierMismatchedSoloProjects } from '@/services/soloProjects';

export const dynamic = 'force-dynamic';

const SoloProjectTierMismatchPage = async () => {
  const records = await getTierMismatchedSoloProjects();
  if (!records.success) {
    return <div>Error fetching Solo Projects</div>;
  }

  return (
    <div>
      <AirtableLinkButton
        path={getATBaseURL('solo-project')}
        label="Go to Solo Project Table in Airtable"
      />
      <H1>Solo Projects with Mismatched Tiers</H1>
      <P>
        This page shows all the solo projects with wrong
        tier flagged by evaluators. Click
        &ldquo;Accept&rdquo; to accept the suggestion or
        manually set tier with the &ldquo;Set Tier&rdquo;
        buttons
      </P>
      <TierMismatchTable
        records={records.data}
        baseUrl={getATBaseURL('solo-project')}
      />
    </div>
  );
};

export default SoloProjectTierMismatchPage;
