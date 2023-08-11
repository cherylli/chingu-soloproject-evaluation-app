import {Comment} from "@/types/CommentTypes";
import {Card, CardContent} from "@/components/ui/card";

const CommentItem = ({comment}: { comment: Comment }) => {
    return <Card>
        <CardContent className="grid gap-4 mt-5">
            <p>{comment.text}</p>
            {
                comment.lastUpdatedTime
                    ? <div className="text-xs leading-none text-gray-500">
                        {`${comment.lastUpdatedTime.toString()} - ${comment.author.name} (edited)`}
                    </div>
                    : <div className="text-xs leading-none text-gray-500">
                        {`${comment.createdTime.toString()} - ${comment.author.name}`}
                    </div>
            }
        </CardContent>
    </Card>
}

export default CommentItem