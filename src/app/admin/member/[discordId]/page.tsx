import {getMemberDetails} from "@/services/members";

const MemberPage =
    async (props: {params: Promise<{discordId: string}>}) => {
        const params = await props.params;

        const userDetails = await getMemberDetails(params.discordId)
        console.log(userDetails)
        return (


            <div>
                MemberPage - {params.discordId}
                {JSON.stringify(userDetails, null, 2)}
            </div>
        )
    }

export default MemberPage