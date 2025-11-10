import ExternalLinkButton from '@/components/ui/buttons/ExternalLinkButton';
import ErrorMsg from '@/components/ui/states/ErrorMsg';
import H1 from '@/components/ui/typography/h1';
import VoyageTeamPageMemberTable from '@/components/voyages/team-page/VoyageTeamPageTable';
import { getATBaseURL } from '@/lib/getAirtableUrls';
import { githubTeamUrl } from '@/lib/urls';
import { getTeamByVoyageNumAndTeamNum } from '@/services/voyages';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { z } from 'zod';

const paramsSchema = z.object({
  voyageNum: z
    .string()
    .transform((val) => Number(val))
    .refine(
      (num) => !isNaN(num) && num >= 40 && num <= 100,
      {
        message: 'Invalid voyage number',
      }
    ),
  teamNum: z
    .string()
    .transform((val) => Number(val))
    .refine(
      (num) => !isNaN(num) && num >= 1 && num <= 100,
      {
        message: 'Invalid team number',
      }
    ),
});

const VoyageTeamPage = async ({
  params,
}: {
  params: Promise<{ voyageNum: string; teamNum: string }>;
}) => {
  const parsedParams = paramsSchema.parse(await params);

  const team = await getTeamByVoyageNumAndTeamNum(
    parsedParams.voyageNum,
    parsedParams.teamNum
  );
  if (!team.success) {
    return <ErrorMsg message="Error fetching team" />;
  }

  const teamData = team.data;

  return (
    <div>
      <H1>
        {`Voyage ${parsedParams.voyageNum} Team ${parsedParams.teamNum}`}
      </H1>
      <ExternalLinkButton
        url={githubTeamUrl(teamData[0].fields)}
        Icon={SiGithub}
        text={'Team Github'}
      />
      <div className="h-5" />
      <VoyageTeamPageMemberTable
        records={teamData}
        atBaseUrl={getATBaseURL('voyage-signup')}
      />
    </div>
  );
};

export default VoyageTeamPage;
