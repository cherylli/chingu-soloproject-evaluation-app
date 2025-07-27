"use server"

import {getAllSoloProjectsByUser} from "@/services/soloProjects";
import {getAllVoyageSignupsByMember} from "@/services/voyages";
import {Submission} from "@/types/SoloProjectTypes";
import {VoyageSignup} from "@/types/VoyageSignupTypes";
import {getApplicationsByMember} from "@/services/applications";
import {Application} from "@/types/ApplicationTypes";

/**
 * Given member's discord ID, find all emails associated with this discordID
 * 1. Members submitted multiple forms with different emails
 *
 * @param {string} discordId - The Discord ID of the member to retrieve emails for.
 * @returns {Promise<string[]>} A promise that resolves to an array of unique email addresses.
 */
const getMemberEmailsByDiscordId = async (discordId: string) => {
    const emails: Set<string> = new Set<string>()
    // get application,
    // there should only be 1 application per person, but sometimes people sign up multiple times with different emails
    const applications = await getApplicationsByMember(discordId)

    if(applications.success){
        applications.data.map(app=>app.fields.Email).forEach(email=>emails.add(email))
    }
    // get solo project(s) using discordID
    const soloProjects = await getAllSoloProjectsByUser(discordId)
    soloProjects.map(sp=>sp.fields.Email).forEach(email=>emails.add(email))

    // get voyage signups(s)
    const voyageSignups = await getAllVoyageSignupsByMember(discordId)

    if(voyageSignups.success) {
        // push unique emails
        voyageSignups.data.map(vs=>vs.fields.Email).forEach(email=>emails.add(email))
    }

    return [...emails]
}

export const getMemberDetailsByDiscordId = async (discordId: string) => {
    // create an array of emails to re-search all the tables
    // some members have used multiple emails

    const allRecords = {
        applications: [],
        soloProjects: [],
        voyageSignups: [],
    } as {
        applications: Application[],
        soloProjects: Submission[],
        voyageSignups: VoyageSignup[]
    }

    // get all emails
    const emails = await getMemberEmailsByDiscordId(discordId)
    console.log(`emails: ${emails}`)

    // search again with all emails (even when there's only 1 email) for cases like
    // 1. records with different emails,
    // 2. records with no discordId



    return allRecords
}