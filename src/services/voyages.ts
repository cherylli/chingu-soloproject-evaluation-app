"use server"

import {voyageSignupTable, transformVoyageSignupData} from "@/lib/airtable";
import {ActionResponse} from "@/types";
import {VoyageSignup} from "@/types/VoyageSignupTypes";

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
        return {
            success: false,
            message: `Failed to get latest voyage signup data. Error: ${e}`,
        }
    }

}

export const getVoyageSignupByVoyageNum = async (voyageNum: number): Promise<ActionResponse<VoyageSignup[]>> => {
    try{
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
    }catch (e) {
        return {
            success: false,
            message: `Failed to get voyage signup data for V${voyageNum}. Error: ${e}`,
        }
    }

}