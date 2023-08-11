import {getCommentsByRecordId} from "@/services/comments";
import CommentItem from "@/components/comments/CommentItem";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import CommentForm from "@/components/comments/CommentForm";

const Comments = async() => {
    //const [comments, setComments] = useState<Comment[]|null>(null)
    const comments = await getCommentsByRecordId("recE0bK9sMfG49kRx")
    return(
        <Collapsible className="m-5 ">
            <CollapsibleTrigger>{`Comments (${comments.data?.length})`}</CollapsibleTrigger>
            <CollapsibleContent>
                {comments.data?
                    comments.data.map(comment=>(
                        <CommentItem key={comment.id} comment={comment}/>)
                    ):null
                }
            </CollapsibleContent>
            <CommentForm/>
        </Collapsible>
    )
 }

 export default Comments