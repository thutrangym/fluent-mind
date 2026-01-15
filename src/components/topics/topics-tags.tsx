"use client";

const tags = [
  "Movie short clip",
  "Daily English Conversation",
  "Learning resources",
  "Listening Time (Shadowing)",
  "IELTS Listening",
  "US UK songs",
  "TOEIC Listening",
  "Entertainment",
  "BBC learning english",
  "VOA Learning English",
  "Toefl Listening",
  "Science and Facts",
  "Fairy Tales",
  "IPA",
  "News",
  "Vietnam Today",
  "TED",
  "Travel vlog",
  "Animals and wildlife",
  "Business English",
];

export default function TopicsTags() {
  return (
    <div className="flex flex-wrap gap-3">
      {tags.map(tag => (
        <button
          key={tag}
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
          #{tag}
        </button>
      ))}
    </div>
  );
}
