import {SoloProjectTier, VoyageRole} from "@/types/SoloProjectTypes";

export type VoyageSignup = {
    id: string,
    fields: VoyageSignupFields
}

export type VoyageSignupFields = {
    Timestamp: string,
    Email: string,
    "Discord Name": string,
    "GitHub ID": string,
    "Evaluation Status (from Solo Project Link)": string,
    "Status": string,
    "Status Comment": string,
    "Voyage": string,
    "Team Name": string, // Tier generated google form automation
    "Team No.": string,
    "Timezone": string,
    "Role": VoyageRole,
    "Role Type": string,
    "Tier": SoloProjectTier, // original signup tier?
    "Info to Share": string,
    "Application Link": string, // might not need -> fetch in user instead
    "Solo Project Link": string, // might not need  -> fetch in user instead
    "Confirmation Form Completed": boolean,
    "Showcase Name Permission?": boolean,
    "Discord ID": string, // might not need -> fetch in user instead
    "Product (from Most Recent Subscriptions & Product Sales)": string,
}