import MemberProfile from '@/components/members/MemberProfile';
import H1 from '@/components/ui/typography/h1';
import { getATBaseURL } from '@/lib/getAirtableUrls';
import { getMemberDetailsByDiscordId } from '@/services/members';
import { Context } from '@/types';

const MemberPage = async (props: {
  params: Promise<{ discordId: string }>;
}) => {
  const params = await props.params;

  const memberDetails = await getMemberDetailsByDiscordId(
    params.discordId
  );
  if (!memberDetails.success)
    return <div>Error fetching member details</div>;

  const atBaseUrls: Partial<Record<Context, string>> = {
    'solo-project': getATBaseURL('solo-project'),
    'voyage-signup': getATBaseURL('voyage-signup'),
    application: getATBaseURL('application'),
  };

  // TODO: improve details display, e.g. a summary section

  return (
    <div>
      <H1>MemberPage - {params.discordId}</H1>
      <MemberProfile
        memberDetails={memberDetails.data}
        atBaseUrls={atBaseUrls}
      />
    </div>
  );
};

export default MemberPage;
