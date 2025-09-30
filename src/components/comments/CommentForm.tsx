'use client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SquarePenIcon } from 'lucide-react';
import { useState } from 'react';

interface CommentFormProps {
  handleAddComment: (comment: string) => void;
}

const CommentForm = ({
  handleAddComment,
}: CommentFormProps) => {
  const [newComment, setNewComment] = useState('');

  const handlePostButtonClick = async () => {
    await handleAddComment(newComment);
    setNewComment('');
  };

  return (
    <>
      <div>Post Comment</div>
      <Textarea
        className="h-[100px] mx-auto mt-1"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button
        onClick={handlePostButtonClick}
        className="my-5 mr-5"
      >
        <SquarePenIcon /> Post
      </Button>
    </>
  );
};

export default CommentForm;
