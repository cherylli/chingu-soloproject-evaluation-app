// Sometimes on airtable, VoyageRole would be something like ["Software Developer", "Software Developer"]
// due to members having multiple applications
// IF the roles are the same, it will just return one - for `roleColors`
// Otherwise, it will return "unknown"
import {VoyageRole} from "@/types/SoloProjectTypes";

export const parseRole = (role: VoyageRole): VoyageRole => {
    const set = new Set(role)
    if (set.size === 1) return [...set].toString() as VoyageRole
    return "unknown"
}