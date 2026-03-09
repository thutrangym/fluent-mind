"use client";

import { useComments } from "@/src/hooks/useComments";
import CommentItem from "./comment-item";
import CommentBox from "./comment-box";

export default function CommentSection({
  postId,
}: {
  postId: string;
}) {
  const comments = useComments(postId);

  return (
    <div className="mt-4 space-y-3">

      <CommentBox postId={postId} />

      {comments.map((c: any) => (
        <CommentItem key={c.id} comment={c} />
      ))}
    </div>
  );
}