'use client'
import {useEffect, useState} from "react";
import CommentItem from "@/components/comments/CommentItem";
import {Comment} from "@/types/CommentTypes";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import CommentForm from "@/components/comments/CommentForm";
import {addCommentByRecordId} from "@/services/comments";

const CommentsClient = ({recordId, comments}: { recordId: string, comments: Comment[] }) => {
    const [localComments, setLocalComments] = useState<Comment[]>(comments)

    const handleAddComment = async (newComment:string) => {
        const res = await addCommentByRecordId(recordId, newComment)
        if(res.success){
            const newCommentArray = localComments.concat(res.data)
            setLocalComments(newCommentArray)
        }
    }

    return (
        <div>
            <Collapsible className="m-5 ">
                <CollapsibleTrigger>{`Comments (${localComments.length})`}</CollapsibleTrigger>
                <CollapsibleContent>
                    {localComments ?
                        localComments.map(comment => (
                            <CommentItem key={comment.id} comment={comment}/>)
                        ) : null
                    }
                </CollapsibleContent>
                <CommentForm handleAddComment={handleAddComment}/>
            </Collapsible>
        </div>
    )
}

export default CommentsClient