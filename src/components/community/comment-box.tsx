"use client";

import { useState } from "react";

export default function CommentBox({ postId }: any) {
  const [text, setText] = useState("");

  const submit = async () => {
    await fetch("/api/community/comments", {
      method: "POST",
      body: JSON.stringify({
        userId: "demo-user",
        postId,
        content: text,
      }),
    });

    setText("");
    location.reload();
  };

  return (
    <div className="flex gap-2">
      <input
        className="border rounded-xl flex-1 p-2"
        placeholder="Write comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={submit}
        className="rounded-lg bg-[#34DBC5] px-6 py-2 font-medium text-white"
      >
        Send
      </button>
    </div>
  );
}