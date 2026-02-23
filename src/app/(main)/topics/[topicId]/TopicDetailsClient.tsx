"use client";

import { useMemo, useState } from "react";
import { Search, PlayCircle, Clock, BookOpen, ChevronRight, Lock } from "lucide-react";

/* ================= TYPES ================= */
type Level = "A1" | "A2" | "B1" | "B2" | "C1";

type Lesson = {
  id: string;
  title: string;
  level: Level;
  duration: string;
  isFree: boolean;
};

const TOPIC = {
  name: "Daily Conversation",
  description: "Improve your daily English communication skills with real-life situations and natural expressions. Master common phrases and build confidence.",
  level: "A1" as Level,
};

const LESSONS: Lesson[] = [
  { id: "L001", title: "Greetings & Introductions", level: "A1", duration: "08:12", isFree: true },
  { id: "L002", title: "Ordering Coffee", level: "A1", duration: "10:05", isFree: true },
  { id: "L003", title: "Asking for Directions", level: "A2", duration: "12:30", isFree: false },
  { id: "L004", title: "Talking about Hobbies", level: "A2", duration: "09:45", isFree: false },
];

export default function TopicDetailsClient() {
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<Level | "all">("all");

  const filteredLessons = useMemo(() => {
    return LESSONS.filter((l) => {
      const matchTitle = l.title.toLowerCase().includes(query.toLowerCase());
      const matchLevel = levelFilter === "all" || l.level === levelFilter;
      return matchTitle && matchLevel;
    });
  }, [query, levelFilter]);

  const levels: (Level | "all")[] = ["all", "A1", "A2", "B1", "B2", "C1"];

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4 md:px-0">
      {/* ===== Hero Header ===== */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-12 text-white shadow-2xl mb-10">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 rounded-full bg-[#88DF46] text-gray-900 font-black text-xs uppercase tracking-widest shadow-lg shadow-[#88DF46]/20">
              {TOPIC.level} Level
            </span>
            <span className="flex items-center gap-1.5 text-white/60 text-sm font-medium">
              <BookOpen size={16} />
              {LESSONS.length} Lessons
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight tracking-tight">
            {TOPIC.name}
          </h1>
          <p className="text-lg text-white/70 leading-relaxed mb-8">
            {TOPIC.description}
          </p>

          <button className="flex items-center gap-2 rounded-2xl bg-[#34DBC5] px-8 py-4 font-black text-gray-900 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#34DBC5]/20">
            <PlayCircle size={20} />
            Start Learning Now
          </button>
        </div>

        {/* Trang trí nền */}
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-[#88DF46]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-5%] w-64 h-64 bg-[#34DBC5]/10 rounded-full blur-3xl" />
      </div>

      {/* ===== Toolbar Section ===== */}
      <div className="sticky top-20 z-30 flex flex-col md:flex-row gap-6 items-center justify-between bg-white/80 backdrop-blur-xl p-4 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50 mb-8">
        {/* Level Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-xl overflow-x-auto w-full md:w-auto">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                levelFilter === lvl
                  ? "bg-white text-[#34DBC5] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {lvl.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#34DBC5] transition-colors" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search specific lessons..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-transparent bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#34DBC5]/10 transition-all font-medium"
          />
        </div>
      </div>

      {/* ===== Lesson Grid ===== */}
      <div className="grid gap-4">
        {filteredLessons.map((lesson, index) => (
          <div
            key={lesson.id}
            className="group flex items-center justify-between rounded-3xl border border-gray-100 bg-white p-5 transition-all hover:shadow-2xl hover:shadow-gray-200 hover:-translate-y-1"
          >
            <div className="flex items-center gap-5">
              <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-50 group-hover:bg-[#34DBC5]/10 transition-colors">
                <span className="text-gray-300 font-black text-xl group-hover:hidden transition-all italic">
                  {(index + 1).toString().padStart(2, '0')}
                </span>
                <PlayCircle className="hidden group-hover:block w-8 h-8 text-[#34DBC5] animate-in zoom-in" />
              </div>

              <div>
                <p className="text-lg font-black text-gray-800 group-hover:text-[#34DBC5] transition-colors leading-tight">
                  {lesson.title}
                </p>
                <div className="flex items-center gap-4 mt-1">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <Clock size={14} className="opacity-50" />
                    {lesson.duration}
                  </span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                    lesson.level.startsWith('A') ? 'bg-blue-50 text-blue-500' : 'bg-purple-50 text-purple-500'
                  }`}>
                    LEVEL {lesson.level}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {!lesson.isFree && (
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100">
                  <Lock size={12} />
                  <span className="text-[10px] font-black uppercase tracking-wider">Premium</span>
                </div>
              )}
              
              <button className="flex items-center justify-center w-12 h-12 md:w-auto md:px-6 rounded-2xl bg-gray-900 text-white font-bold text-sm transition-all hover:bg-black active:scale-90 group-hover:shadow-lg group-hover:shadow-gray-300">
                <span className="hidden md:inline">Learn Now</span>
                <ChevronRight className="md:ml-1" size={18} />
              </button>
            </div>
          </div>
        ))}

        {filteredLessons.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-100">
            <Search size={48} className="mb-4 opacity-20" />
            <p className="font-bold text-xl">No lessons found matching your criteria</p>
            <button onClick={() => {setQuery(""); setLevelFilter("all")}} className="mt-4 text-[#34DBC5] font-bold hover:underline">
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}