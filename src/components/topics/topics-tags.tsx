"use client";

import { useEffect, useState } from "react";

type Topic = {
  id: string;
  title: string;
};

export default function TopicsTags() {

  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    fetch("/api/topics")
      .then(res => res.json())
      .then(data => setTopics(data))
      .catch(err => console.error(err));
  }, []);

  if (!topics.length) {
    return <div className="text-sm text-gray-400">Loading topics...</div>;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {topics.map(topic => (
        <button
          key={topic.id}
          className="
            rounded-full border border-primary/30
            px-4 py-2 text-sm font-medium
            text-primary
            transition-all duration-200
            hover:border-[#88DF46]
            hover:bg-[#88DF46]/10
            hover:text-[#2e7d32]
          "
        >
          #{topic.title}
        </button>
      ))}
    </div>
  );
}