import {getVoyageSignupByVoyageNum} from "@/services/voyages";
import SingleVoyageSignupTable from "@/components/voyages/signups/SingleVoyageSignupTable";
import {z} from "zod";
import {getAtTableBaseUrl} from "@/lib/getAtTableBaseUrl";

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

    if (!signups.success) {
        return <div>Error fetching signups</div>
    }

    return (
        <div>
            SingleVoyageSignupPage - {parsedParams.voyageNum}
            <SingleVoyageSignupTable
                records={signups.data}
                atBaseUrl={getAtTableBaseUrl("voyage-signup")}
            />
        </div>
    )
}

export default SingleVoyageSignupPage