import {NextResponse} from "next/server";
import {table} from "@/lib/airtable";

export async function GET(request: Request) {
    const records = await table.select({}).firstPage()
    return NextResponse.json(records)
}