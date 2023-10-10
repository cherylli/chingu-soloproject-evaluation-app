'use client'
import {useState} from "react";
import CommentItem from "@/components/comments/CommentItem";
import {Comment} from "@/types/CommentTypes";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import CommentForm from "@/components/comments/CommentForm";
import {addCommentByRecordId} from "@/services/comments";
import {ChevronDown, ChevronUp} from "lucide-react";

const CommentsClient = ({recordId, comments}: { recordId: string, comments: Comment[] }) => {
    const [localComments, setLocalComments] = useState<Comment[]>(comments)
    const [isOpen, setIsOpen] = useState(true)

    const handleAddComment = async (newComment:string) => {
        const res = await addCommentByRecordId(recordId, newComment)
        if(res.success){
            setLocalComments(localComments.concat(res.data))
        }
    }

    return (
        <div>
            <Collapsible className="m-5" open={isOpen} onOpenChange={setIsOpen}>
                <CommentForm handleAddComment={handleAddComment}/>
                <CollapsibleTrigger className="flex items-end">
                    {`Comments (${localComments.length})`}
                    {isOpen?<ChevronUp/>:<ChevronDown/>}
                </CollapsibleTrigger>
                <CollapsibleContent>
                    {localComments ?
                        localComments.map(comment => (
                            <CommentItem key={comment.id} comment={comment}/>)
                        ) : null
                    }
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}

export default CommentsClient