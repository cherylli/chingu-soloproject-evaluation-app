import Airtable, {FieldSet, Record, Records} from "airtable";

const base = new Airtable({apiKey: process.env.AIRTABLE_PAT})
    .base(process.env.AIRTABLE_BASEID!)

const table = base(process.env.AIRTABLE_TABLEID!)

const fields = [
    "Discord Name",
    "Timestamp",
    "Tier",
    "GitHub Repo URL",
    "Deployed App URL",
    "Evaluation Status",
    "Evaluator",
    "Evaluation Feedback"
]

const transformData = (records:Records<FieldSet>) => {
    return records.map((record: Record<FieldSet>)=>{
        return {
            id: record.id,
            fields: record.fields
        }
    })
}

const transformDataSingleRecord = (record:Record<FieldSet>) => {
   return {
            id: record.id,
            fields: record.fields
        }
}

export {table,fields, transformData, transformDataSingleRecord}