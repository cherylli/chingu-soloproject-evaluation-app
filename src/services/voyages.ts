"use server"

import {voyageSignupTable, transformVoyageSignupData, createOrFilter} from "@/lib/airtable";
import {ActionResponse} from "@/types";
import {VoyageSignup, VoyageSignupFields, VoyageSignupSearchableFields} from "@/types/VoyageSignupTypes";

export const getLastestVoyageSignups = async (): Promise<ActionResponse<VoyageSignup[]>> => {
    try {
        const records = await voyageSignupTable.select({
            sort: [
                {field: "Timestamp", direction: "desc"}
            ],
            pageSize: 20
        }).firstPage()

        return {
            success: true,
            message: "Successfully get latest voyage signup data.",
            data: transformVoyageSignupData(records)
        }
    } catch (e) {
        throw new Error(`Failed to get latest voyage signup data. Error: ${e}`)
    }

}

export const getVoyageSignupByVoyageNum = async (voyageNum: number): Promise<ActionResponse<VoyageSignup[]>> => {
    try {
        const records = await voyageSignupTable.select({
            filterByFormula: `AND({Voyage} = "V${voyageNum}", {Email} != "")`,
            sort: [{
                field: "Timestamp",
                direction: "desc"
            }]
        }).all()

        return {
            success: true,
            message: `Successfully get voyage signup data for V${voyageNum}`,
            data: transformVoyageSignupData(records)
        }
    } catch (e) {
        throw new Error(`Failed to get voyage signup data for V${voyageNum}. Error: ${e}`)
    }
}

export const getAllVoyageSignupsByMember = async (
    discordId?: string,
    email?: string,
): Promise<ActionResponse<VoyageSignup[]>> => {
    if(!discordId && !email){
        return {
            success: false,
            message: "Either discordId or email must be provided.",
        }
    }

    try{
        const conditions: {field: VoyageSignupSearchableFields, value: string}[] = []

        if(discordId){
            conditions.push({field: 'Discord ID', value: discordId})
        }
        if(email){
            conditions.push({field: 'Email', value: email})
        }

        const filter = createOrFilter(conditions)

        const records = await voyageSignupTable.select({
            filterByFormula: filter
        }).all()

        return {
            success: true,
            data:transformVoyageSignupData(records),
            message: "Successfully get voyage signup data."
        }
    }catch (e) {
        throw new Error(`Failed to get voyage signup data. Error: ${e}`)
    }

}