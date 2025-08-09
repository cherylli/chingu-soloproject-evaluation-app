import {VoyageSignupFields} from "@/types/VoyageSignupTypes";

export const githubTeamUrl = (
     voyageSignupFields: VoyageSignupFields
    // voyageNum: string,
    // tierNum: "1" | "2" | "3",
    // teamNum: string
) => {
    const voyageNum = voyageSignupFields?.Voyage.slice(1) || "0"
    const tierNum = voyageSignupFields?.Tier[5] || "0"
    const teamNum = voyageSignupFields["Team No."]?.padStart(2,'0') || "0"
    return `https://github.com/orgs/chingu-voyages/teams/v${voyageNum}-tier${tierNum}-team-${teamNum}/members`
}
