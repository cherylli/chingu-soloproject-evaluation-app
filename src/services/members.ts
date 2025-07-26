"use server"

import {getAllSoloProjectsByUser} from "@/services/soloProjects";
import {getAllVoyageSignupsByMember} from "@/services/voyages";
import {Submission} from "@/types/SoloProjectTypes";
import {VoyageSignup} from "@/types/VoyageSignupTypes";

export const getMemberDetails = async (discordId: string) => {
    // create an array of emails to re-search all the tables
    // some members have used multiple emails
    const emails: string[] = []
    const allRecords = {
        //applications: [],
        soloProjects: [],
        voyageSignups: [],
    } as {
        soloProjects: Submission[],
        voyageSignups: VoyageSignup[]
    }

    // get application,
    // get solo project(s) using discordID
    const soloProjects = await getAllSoloProjectsByUser(discordId)
    console.log("solo projects: ", soloProjects)
    emails.push(...new Set(soloProjects.map(sp => sp.fields.Email)))

    allRecords.soloProjects = soloProjects
    console.log(emails)


    // get voyage signups(s)
    const voyageSignups = await getAllVoyageSignupsByMember(discordId)
    console.log("voyage signups", voyageSignups)

    if(voyageSignups.success) {
        allRecords.voyageSignups = voyageSignups.data
        // push unique emails
    }

    // other possible matches based on email from different tables
    return allRecords
}