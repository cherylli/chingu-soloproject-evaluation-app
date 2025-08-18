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
  return (
    <div>
      VoyageTeamPage - Placeholder for v
      {parsedParams.voyageNum} team {parsedParams.teamNum}
    </div>
  );
};

export default VoyageTeamPage;
