import {fields, table, transformData, transformDataSingleRecord} from "@/lib/airtable";
import {FilteredFields, Submission} from "@/types/SoloProjectTypes";

export const getAllSoloProjects = async (): Promise<Submission[]> => {
    const records =  await table.select({}).firstPage()
    return transformData(records)
}

export const getSoloProjectsByStatus = async (status:string): Promise<Submission[]> => {
    const filter = `{Evaluation Status} = "${status}"`
    const records = await table.select({
        filterByFormula: filter,
        fields: fields,
    }).firstPage()
    return transformData(records)
}

export const getSoloProjectById = async (id: string): Promise<Submission> => {
    const record = await table.find(id)
    return transformDataSingleRecord(record)
}

export const updateSoloProjectById = async (id: string, fields: FilteredFields)=> {
    // TODO: check response type and update

}