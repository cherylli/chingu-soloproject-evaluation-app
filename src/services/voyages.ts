"use server"

import {voyageSignupTable, transformVoyageSignupData} from "@/lib/airtable";

export const getLastestVoyageSignups = async () => {
    const records = await voyageSignupTable.select({
        sort: [
            {field: "Timestamp", direction: "desc"}
        ],
        pageSize: 20
    }).firstPage()

    return transformVoyageSignupData(records)
}