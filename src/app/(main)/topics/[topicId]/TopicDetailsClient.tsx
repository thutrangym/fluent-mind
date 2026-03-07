"use client";

import { useMemo, useState } from "react";
import {
  Search,
  PlayCircle,
  Clock,
  BookOpen,
  ChevronRight,
  Lock,
} from "lucide-react";
import VideoCard from "@/src/components/topics/video-card";
import Link from "next/link";
/* ================= TYPES ================= */
type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

type Video = {
  id: string;
  title: string | null;
  youtubeId: string;
  level: Level;
  duration?: string;
  isFree?: boolean;
};

type Props = {
  topic: {
    id: string;
    title?: string | null;
    description?: string | null;
  };
  videos: Video[];

};

export default function TopicDetailsClient({ topic, videos }: Props) {
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<Level | "all">("all");
  const firstVideo = videos[0]
  const filteredVideos = useMemo(() => {
    return videos.filter((v) => {
      const matchTitle = v.title?.toLowerCase().includes(query.toLowerCase());
      const matchLevel = levelFilter === "all" || v.level === levelFilter;
      return matchTitle && matchLevel;
    });
  }, [query, levelFilter, videos]);

  const levels: (Level | "all")[] = ["all", "A1", "A2", "B1", "B2", "C1"];

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4 md:px-0 bg-[#FAFFF6]">
      {/* ===== Hero ===== */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-12 text-white shadow-2xl mb-10">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center gap-1.5 text-white/60 text-sm font-medium">
              <BookOpen size={16} />
              {videos.length} Videos
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-4">
            {topic.title}
          </h1>

          <p className="text-lg text-white/70 mb-8">
            {topic.description || "No description available."}
          </p>
          <Link
            href={`/video/${firstVideo.youtubeId}`}
          >
            <button className="flex items-center gap-2 rounded-2xl bg-[#34DBC5] px-8 py-4 font-black text-gray-900 hover:scale-105">
              <PlayCircle size={20} />
              Start Learning Now
            </button>
          </Link>
        </div>
      </div>

      {/* ===== Toolbar ===== */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
        <div className="flex bg-gray-100 p-1 rounded-xl overflow-x-auto">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-5 py-2 rounded-lg text-sm font-bold ${
                levelFilter === lvl
                  ? "bg-white text-[#34DBC5]"
                  : "text-gray-500"
              }`}
            >
              {lvl.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search videos..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50"
          />
        </div>
      </div>

      {/* ===== Video Grid ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredVideos.map((video) => (
          <VideoCard
            key={video.id}
            id={video.id}
            title={video.title}
            youtubeId={video.youtubeId}
            level={video.level}
          />
        ))}
      </div>
    </div>
  );
}
