import { useEffect, useState } from "react";

export function useComments(postId: string) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`/api/community/comments?postId=${postId}`)
      .then((res) => res.json())
      .then(setComments);
  }, [postId]);

  return comments;
}