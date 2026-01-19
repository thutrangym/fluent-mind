import { Comment } from "../../data/comment.mock";

export default function CommentItem({
  comment,
}: {
  comment: Comment;
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-medium">{comment.name}</p>
        <span className="text-xs text-gray-400">{comment.time}</span>
      </div>

      <p className="text-sm text-gray-700">
        {comment.content}
      </p>
    </div>
  );
}
