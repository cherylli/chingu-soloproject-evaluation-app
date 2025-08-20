import MemberProfile from '@/components/members/MemberProfile';
import NoRecordFound from '@/components/ui/states/NoRecordFound';
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
    return (
      <NoRecordFound
        message={memberDetails.message}
        actionButton={{
          label: 'Search by Email',
          link: '/admin/member/search',
        }}
      />
    );

  const atBaseUrls: Partial<Record<Context, string>> = {
    'solo-project': getATBaseURL('solo-project'),
    'voyage-signup': getATBaseURL('voyage-signup'),
    application: getATBaseURL('application'),
  };

  // TODO: improve details display, e.g. a summary section

  return (
    <>
      <MemberProfile
        memberDetails={memberDetails.data}
        atBaseUrls={atBaseUrls}
      />
    </>
  );
};

export default MemberPage;
