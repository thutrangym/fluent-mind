"use client";

import CommentSection from "./comment-section";
import avatarPlaceholder from "@/src/assets/avatar_placeholder.jpg"
import Image from "next/image"

export default function PostCard({ post }: any) {
  return (
    <div className="border rounded-xl p-4 bg-white">
      <div className="flex items-center gap-2 mb-2">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-4 border-white shadow-md">
        <Image
            src={post.author.image || avatarPlaceholder}
            alt="avatar"
            fill
            className="object-cover"
          />

        </div>

        <span className="font-medium">
          {post.author.name}
        </span>
      </div>

      <h3 className="text-lg font-semibold">
        {post.title}
      </h3>

      <p className="text-gray-600">
        {post.content}
      </p>

      <CommentSection postId={post.id} />
    </div>
  );
}