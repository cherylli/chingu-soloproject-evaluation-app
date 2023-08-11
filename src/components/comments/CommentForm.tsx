'use client'
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {addCommentByRecordId} from "@/services/comments";

const CommentForm = () => {
    const [newComment, setNewComment] = useState('')

    const handleAddComment = async () => {
        const res = await addCommentByRecordId("recE0bK9sMfG49kRx", newComment)
        console.log(res)
    }
    return(
        <>
            <Textarea
                className="h-[100px]"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
            />
            <Button onClick={handleAddComment}>Post</Button>
        </>

    )
 }
 
 export default CommentForm