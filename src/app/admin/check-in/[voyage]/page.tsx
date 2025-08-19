import CheckinTable from '@/components/checkins/checkinTable';
import ErrorMsg from '@/components/ui/states/ErrorMsg';
import NoRecordFound from '@/components/ui/states/NoRecordFound';
import { getCheckInsByVoyage } from '@/services/checkins';
import { z } from 'zod';

const paramsSchema = z.object({
  voyage: z
    .string()
    .regex(
      /^[Vv]\d{2}/,
      "Voyage must start with 'V' or 'v' followed by 2 digits"
    ),
});

const CheckinByVoyagePage = async (props: {
  params: Promise<{ voyage: string }>;
}) => {
  const parsedParams = paramsSchema.safeParse(
    await props.params
  );

  if (!parsedParams.success) {
    return (
      <ErrorMsg
        message={parsedParams.error.issues[0].message}
      />
    );
  }

  const records = await getCheckInsByVoyage(
    parsedParams.data.voyage
  );

  if (!records || !records.length) {
    return (
      <NoRecordFound
        message={`No record found for voyage ${parsedParams.data.voyage}`}
      />
    );
  }

  return (
    <>
      <h1 className="text-center">
        {parsedParams.data.voyage} Checkins
      </h1>
      <CheckinTable records={records} />
    </>
  );
};

export default CheckinByVoyagePage;
