import {Application} from "@/types/ApplicationTypes";
import {Submission} from "@/types/SoloProjectTypes";
import {VoyageSignup} from "@/types/VoyageSignupTypes";

export type MemberDetails = {
    applications: Application[],
    soloProjects: Submission[],
    voyageSignups: VoyageSignup[]
}