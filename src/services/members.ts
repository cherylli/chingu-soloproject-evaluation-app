"use server"

import {getAllSoloProjectsByUser} from "@/services/soloProjects";
import {getAllVoyageSignupsByMember} from "@/services/voyages";
import {getApplicationsByMember} from "@/services/applications";
import {getRecordsByFilter} from "@/services/common";
import {createOrFilter} from "@/lib/airtable";
import {SearchableFields} from "@/types";
import {MemberDetails} from "@/types/MemberTypes";


/**
 * Given member's discord ID, find all emails associated with this discordID
 * 1. Members submitted multiple forms with different emails
 *
 * @param {string} discordId - The Discord ID of the member to retrieve emails for.
 * @returns {Promise<string[]>} A promise that resolves to an array of unique email addresses.
 */
const getMemberEmailsByDiscordId= async (discordId: string): Promise<string[]>  => {
    const emails: Set<string> = new Set<string>()
    // get application,
    // there should only be 1 application per person, but sometimes people sign up multiple times with different emails
    const applications = await getApplicationsByMember(discordId)

    if (applications.success) {
        applications.data.map(app => app.fields.Email).forEach(email => emails.add(email))
    }
    // get solo project(s) using discordID
    const soloProjects = await getAllSoloProjectsByUser(discordId)
    soloProjects.map(sp => sp.fields.Email).forEach(email => emails.add(email))

    // get voyage signups(s)
    const voyageSignups = await getAllVoyageSignupsByMember(discordId)

    if (voyageSignups.success) {
        // push unique emails
        voyageSignups.data.map(vs => vs.fields.Email).forEach(email => emails.add(email))
    }

    return [...emails]
}

export const getMemberDetailsByDiscordId = async (discordId: string) => {
    // create an array of emails to re-search all the tables
    // some members have used multiple emails

    try {
        const allRecords: MemberDetails = {
            applications: [],
            soloProjects: [],
            voyageSignups: [],
        }

        // get all emails
        const emails = await getMemberEmailsByDiscordId(discordId)
        console.log(`emails: ${emails}`)

        // search again with all emails (even when there's only 1 email) for cases like
        // 1. records with different emails,
        // 2. records with no discordId

        const conditions = emails
            .map(email => ({field: "Email" as SearchableFields, value: email}))
        conditions.push({field: "Discord ID", value: discordId})


        const soloProjects = await getRecordsByFilter(
            "soloProject",
            () => createOrFilter(conditions)
        )

        if(soloProjects.success) {
            allRecords.soloProjects = soloProjects.data
        }

        const applications = await getRecordsByFilter(
            "application",
            () => createOrFilter(conditions)
        )

        if(applications.success) {
            allRecords.applications = applications.data
        }

        const voyageSignups = await getRecordsByFilter(
            "voyageSignup",
            () => createOrFilter(conditions)
        )

        if(voyageSignups.success) {
            allRecords.voyageSignups = voyageSignups.data
        }

        return allRecords
    }catch (e) {
        throw new Error(`Failed to get member details. Error: ${e}`)
    }
}