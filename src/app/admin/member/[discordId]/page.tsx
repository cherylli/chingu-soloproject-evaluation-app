import {getMemberDetailsByDiscordId} from "@/services/members";
import MemberDetails from "@/components/members/MemberDetails";
import {getAtTableBaseUrl} from "@/lib/getAtTableBaseUrl";
import {Context} from "@/types";

const MemberPage =
    async (props: {params: Promise<{discordId: string}>}) => {
        const params = await props.params;

        const memberDetails = await getMemberDetailsByDiscordId(params.discordId)
        console.log(memberDetails)

        const atBaseUrls: Partial<Record<Context, string>> = {
            "solo-project": getAtTableBaseUrl("solo-project"),
            "voyage-signup": getAtTableBaseUrl("voyage-signup"),
            "application": getAtTableBaseUrl("application")
        }

        return (
            <div>
                MemberPage - {params.discordId}
                <MemberDetails
                    memberDetails={memberDetails}
                    atBaseUrls={atBaseUrls}
                />
            </div>
        )
    }

export default MemberPage