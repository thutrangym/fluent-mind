"use client";

import { useState } from "react";

export default function CreatePost({ userId }: any) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submit = async () => {
    await fetch("/api/community/posts", {
      method: "POST",
      body: JSON.stringify({
        userId,
        title,
        content,
      }),
    });

    location.reload();
  };

  return (
    <div className="border p-4 rounded-xl bg-white">
        <h2 className="mb-4 font-semibold">Leave a comment</h2>
      <input
        placeholder="Title"
        className="w-full border rounded-xl p-2 mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Share something..."
        className="w-full border rounded-xl p-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={submit}
        className="rounded-lg bg-[#34DBC5] px-6 py-2 font-medium text-white"
      >
        Post
      </button>
    </div>
  );
}