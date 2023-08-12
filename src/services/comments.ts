"use server"
import {Comment} from "@/types/CommentTypes";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";

const baseId = process.env.AIRTABLE_BASEID
const tableId = process.env.AIRTABLE_TABLEID
const baseUrl = process.env.AIRTABLE_BASEURL
const pat = process.env.AIRTABLE_PAT

type CommentsApiResponse = {
    success: boolean,
    data?: Comment[]
}

export const getCommentsByRecordId = async (id:string): Promise<CommentsApiResponse> => {
    const res = await fetch(`${baseUrl}/${baseId}/${tableId}/${id}/comments`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${pat}`
        },
        cache: "no-store",
        next: {
            tags: ['comments']
        }
    })
    if(res.ok){
        const data = await res.json()
        return {
            success:true,
            data: data.comments.reverse()
        }
    }
    return {
        success:false
    }
}

export const addCommentByRecordId = async (id:string, content:string) => {
    const sessionData = await getServerSession(options)
    const res = await fetch(`${baseUrl}/${baseId}/${tableId}/${id}/comments`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${pat}`,
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            text: `${content} (${sessionData?.user.evaluatorEmail} via app)`
        })
    })
    if(res.ok){
        const data = await res.json()
        return {
            success:true,
            data
        }
    }
    return {
        success:false
    }
}