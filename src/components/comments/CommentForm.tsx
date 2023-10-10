'use client'
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useState} from "react";

interface CommentFormProps {
    handleAddComment: (comment:string) => void
}

const CommentForm = ({handleAddComment}:CommentFormProps) => {
    const [newComment, setNewComment] = useState('')

    const handlePostButtonClick = async() => {
        await handleAddComment(newComment)
        setNewComment('')
    }

    return(
        <>
            <Textarea
                className="h-[100px]"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
            />
            <Button onClick={handlePostButtonClick} className="my-5 mr-5">Post</Button>
        </>

    )
 }
 
 export default CommentForm