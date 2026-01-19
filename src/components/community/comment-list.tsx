import { comments } from "./../../data/comment.mock";
import CommentItem from "./comment-item";

export default function CommentList() {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
