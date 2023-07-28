import {NextRequest, NextResponse} from "next/server";
import {table, transformDataSingleRecord} from "@/lib/airtable";

export async function GET(request: NextRequest, {params}: { params: { id: string } }) {
    // It seems table.find() does not take fields parameter to return only certain fields
    const record = await table.find(params.id)
    return NextResponse.json(transformDataSingleRecord(record))

}

export async function PATCH(request: NextRequest, {params}: { params: { id: string } }) {
    const data = await request.json()
    console.log(data)
    const updatedRecord = await table.update([
        {
            "id":params.id,
            "fields": data.fields,
        }
    ])
    // const updatedRecord = await res.json()
    return NextResponse.json(updatedRecord)
}