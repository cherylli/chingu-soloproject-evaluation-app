"use server"

import {getAllSoloProjectsByUser} from "@/services/soloProjects";

export const getMemberDetails = async (discordId: string) => {
    // get application
    // get solo project(s)
    const soloProjects = await getAllSoloProjectsByUser(discordId, "")
    console.log(soloProjects)
    return {
        soloProjects
    }
    // get voyage signups(s)
}