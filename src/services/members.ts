"use server"

import {getAllSoloProjectsByUser} from "@/services/soloProjects";

export const getMemberDetails = async (discordId: string) => {
    // create an array of emails to re-search all the tables
    // some members have used multiple emails
    const emails = []

    // get application,
    // get solo project(s) using discordID
    const soloProjects = await getAllSoloProjectsByUser(discordId)
    console.log(soloProjects)
    emails.push(...new Set(soloProjects.map(sp => sp.fields.Email)))

    console.log(emails)


    // get voyage signups(s)
    //const voyageSignups = await getVoyageSignupsByUser(discordId)

    // other possible matches based on email from different tables
    return {
        soloProjects
    }
}