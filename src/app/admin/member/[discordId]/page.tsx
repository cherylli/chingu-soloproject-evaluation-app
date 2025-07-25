import {getMemberDetails} from "@/services/members";

const MemberPage =
    async ({params}: {params: {discordId: string}}
) =>
{

    const userDetails = await getMemberDetails(params.discordId)
    console.log(userDetails)
    return (


        <div>
            MemberPage - {params.discordId}
        </div>
    )
}

export default MemberPage