import {getMemberDetailsByDiscordId} from "@/services/members";
import MemberDetails from "@/components/members/MemberDetails";
import {getAtTableBaseUrl} from "@/lib/getAtTableBaseUrl";
import {Context} from "@/types";
import H1 from "@/components/ui/typography/h1";

const MemberPage =
    async (props: {params: Promise<{discordId: string}>}) => {
        const params = await props.params;

        const memberDetails = await getMemberDetailsByDiscordId(params.discordId)


        const atBaseUrls: Partial<Record<Context, string>> = {
            "solo-project": getAtTableBaseUrl("solo-project"),
            "voyage-signup": getAtTableBaseUrl("voyage-signup"),
            "application": getAtTableBaseUrl("application")
        }

        // TODO: improve details display, e.g. a summary section

        return (
            <div>
                <H1>MemberPage - {params.discordId}</H1>
                <MemberDetails
                    memberDetails={memberDetails}
                    atBaseUrls={atBaseUrls}
                />
            </div>
        )
    }

export default MemberPage