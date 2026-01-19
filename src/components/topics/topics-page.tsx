"use client";

import { useState } from "react";
import TopicsHeader from "./topics-header";
import TopicsTags from "./topics-tags";
import TopicSection from "./topic-section";
import { topicSections } from "@/src/data/topics.mock";

export type LevelType = "beginner" | "experienced";

export default function TopicsPageClient() {
  const [level, setLevel] = useState<LevelType>("beginner");

  const filteredSections = topicSections.filter(section =>
    section.levels.includes(level)
  );

  return (
    <main className="min-h-screen bg-[#FAFFF6] mx-auto  px-4 py-10 space-y-10">
      <TopicsHeader level={level} onChange={setLevel} />
      <TopicsTags />

      {filteredSections.map(section => (
        <TopicSection key={section.id} {...section} />
      ))}
    </main>
  );
}
