import {getCommentsByRecordId} from "@/services/comments";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import Comment from "@/components/comments/Comment";

const Comments = async() => {
    const comments = await getCommentsByRecordId("recE0bK9sMfG49kRx")
    console.log(comments)
    return(
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>{`Comments (${comments.data?.length})`}</AccordionTrigger>
                <AccordionContent>
                    {comments.data?
                        comments.data.map(comment=><Comment key={comment.id} comment={comment}/>)
                        :null
                    }
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
 }

 export default Comments