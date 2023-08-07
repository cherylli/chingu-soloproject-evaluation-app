import Airtable, {FieldSet, Record, Records} from "airtable";
import {EvaluationStatus, Submission, VoyageRole} from "@/types/SoloProjectTypes";

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

const transformData = (records:Records<FieldSet>): Submission[] => {
    return records.map((record: Record<FieldSet>)=>{
        return {
            id: record.id,
            fields: {
                "Discord Name": record.fields["Discord Name"] as string,
                "Timestamp": record.fields["Timestamp"] as string,
                "Tier": record.fields["Tier"] as string,
                "GitHub Repo URL": record.fields["GitHub Repo URL"] as string,
                "Deployed App URL": record.fields["Deployed App URL"] as string,
                "Evaluation Status": record.fields["Evaluation Status"] as EvaluationStatus,
                "Evaluator": record.fields["Evaluator"] as string,
                "Evaluation Feedback": record.fields["Evaluation Feedback"] as string,
                "Voyage Role (from Applications link)": record.fields["Voyage Role (from Applications link)"] as VoyageRole
            }
        }
    })
}

// TODO: might be able to refactor the following duplicated code
const transformDataSingleRecord = (record:Record<FieldSet>) => {
   return {
       id: record.id,
       fields: {
           "Discord Name": record.fields["Discord Name"] as string,
           "Timestamp": record.fields["Timestamp"] as string,
           "Tier": record.fields["Tier"] as string,
           "GitHub Repo URL": record.fields["GitHub Repo URL"] as string,
           "Deployed App URL": record.fields["Deployed App URL"] as string,
           "Evaluation Status": record.fields["Evaluation Status"] as EvaluationStatus,
           "Evaluator": record.fields["Evaluator"] as string,
           "Evaluation Feedback": record.fields["Evaluation Feedback"] as string,
           "Voyage Role (from Applications link)": record.fields["Voyage Role (from Applications link)"] as VoyageRole
       }
   }
}

export {
    table,
    userTable,
    fields,
    transformData,
    transformDataSingleRecord
}