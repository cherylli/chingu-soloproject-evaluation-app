import {NextRequest, NextResponse} from "next/server";
import {revalidateTag} from "next/cache";

export async function POST(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get('secret')
    const tag = request.nextUrl.searchParams.get('tag')

    if(secret!== process.env.REVALIDATE_TOKEN){
        return NextResponse.json(
            { message: 'Invalid secret' },
            { status: 401 })
    }
    if(!tag){
        return NextResponse.json(
            { message: 'Missing tag param' },
            { status: 400 }
        )
    }

    revalidateTag(tag)

    return NextResponse.json({
        revalidated: true,
        now: Date.now()
    })
}