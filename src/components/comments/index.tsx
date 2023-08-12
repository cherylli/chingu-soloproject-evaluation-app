/*
    The purpose of this app is just to fetch data (comments)
    and feed it to a client component,
    as client components do not support async fetching
*/
import {getCommentsByRecordId} from "@/services/comments";
import CommentsClient from "@/components/comments/CommentsClient";

const Comments = async ({recordId}:{recordId:string}) => {
    const comments = await getCommentsByRecordId(recordId)
    return (
        comments.data ?
            <CommentsClient recordId={recordId} comments={comments.data}/>
            : null
    )
}

export default Comments