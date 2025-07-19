import {getVoyageSignupByVoyageNum} from "@/services/voyages";
import {z} from "zod";
import VoyageSignupTable from "@/components/voyages/signups/VoyageSignupTable";

const paramsSchema = z.object({
    voyageNum: z
        .string()
        .transform((val) => Number(val))
        .refine((num) => !isNaN(num) && num >= 40 && num <= 100, {
            message: 'Invalid voyage number',
        })
})

const SingleVoyageSignupPage = async ({
    params
}: {
    params: Promise<{ voyageNum: string }>
}) => {
    const parsedParams = paramsSchema.parse(await params)

    const signups = await getVoyageSignupByVoyageNum(parsedParams.voyageNum)

    if(!signups.success){
        return <div>Error fetching signups</div>
    }

    return (
        <div>
            SingleVoyageSignupPage - {parsedParams.voyageNum}
            <VoyageSignupTable
                records={signups.data}
                atBaseUrl={`https://airtable.com/${process.env.AIRTABLE_BASEID}/${process.env.AIRTABLE_VOYAGE_SIGNUP_TABLEID}`}
            />
        </div>
    )
}

export default SingleVoyageSignupPage