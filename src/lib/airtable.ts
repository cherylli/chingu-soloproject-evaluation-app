import Airtable, {FieldSet, Record, Records} from "airtable";

const base = new Airtable({apiKey: process.env.AIRTABLE_PAT})
    .base(process.env.AIRTABLE_BASEID as string)

const table = base(process.env.AIRTABLE_TABLEID as string)
const userTable = base(process.env.AIRTABLE_USERS_TABLEID as string)

const fields = [
    "Discord Name",
    "Timestamp",
    "Tier",
    "GitHub Repo URL",
    "Deployed App URL",
    "Evaluation Status",
    "Evaluator",
    "Evaluation Feedback",
    "Voyage Role (from Applications link)"
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

export {
    table,
    userTable,
    fields,
    transformData,
    transformDataSingleRecord
}