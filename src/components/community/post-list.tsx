"use client";

import { usePosts } from "@/src/hooks/usePosts";
import PostCard from "./post-card";

export default function PostList() {
  const posts = usePosts();

  if (!posts) {
    return (
      <div className="text-center text-gray-500 py-10">
        Loading posts...
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No posts yet. Be the first to post!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}