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
        }
    })
    if(res.ok){
        const data = await res.json()
        return {
            success:true,
            data: data.comments
        }
    }
    return {
        success:false
    }
}