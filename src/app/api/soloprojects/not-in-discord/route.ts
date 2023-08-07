import {NextResponse} from "next/server";
import {fields, table, transformData} from "@/lib/airtable";

export async function GET(request: Request) {
    const filter = "{Evaluation Status} = \"Not in Discord\""
    const records = await table.select({
        filterByFormula: filter,
        fields: fields,
    }).firstPage()
    return NextResponse.json(transformData(records))
}