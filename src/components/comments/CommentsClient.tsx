'use client';
import CommentForm from '@/components/comments/CommentForm';
import CommentItem from '@/components/comments/CommentItem';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { addCommentByRecordId } from '@/services/comments';
import { Comment } from '@/types/CommentTypes';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const CommentsClient = ({
  recordId,
  comments,
}: {
  recordId: string;
  comments: Comment[];
}) => {
  const [localComments, setLocalComments] =
    useState<Comment[]>(comments);
  const [isOpen, setIsOpen] = useState(true);

  const handleAddComment = async (newComment: string) => {
    const res = await addCommentByRecordId(
      recordId,
      newComment
    );
    if (res.success) {
      setLocalComments(localComments.concat(res.data));
    }
  };

  return (
    <div>
      <Collapsible
        className="w-[90%] mx-auto mt-5"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <CommentForm handleAddComment={handleAddComment} />
        <CollapsibleTrigger className="flex items-end">
          {`Comments (${localComments.length})`}
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </CollapsibleTrigger>
        <CollapsibleContent>
          {localComments
            ? localComments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                />
              ))
            : null}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default CommentsClient;
