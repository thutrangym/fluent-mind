import { useEffect, useState } from "react";

export function usePosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/community/posts")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return posts;
}