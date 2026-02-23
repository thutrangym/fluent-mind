"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  MoreVertical,
  BookOpen,
  Calendar,
  Layers,
  Edit3,
  Trash2,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/src/components/ui/dropdown-menu";
import TopicFormModal from "@/src/components/topics/TopicFormModal";
import EditTopicModal from "@/src/components/topics/EditTopicClient";

/* ================= TYPES ================= */
type TopicLevel = "A1" | "A2" | "B1" | "B2" | "C1";

type Topic = {
  id: string;
  title: string;
  level: TopicLevel;
  lessons: number;
  createdAt: string;
  status: "active" | "draft";
};

/* ================= MOCK DATA ================= */
const MOCK_TOPICS: Topic[] = [
  {
    id: "T001",
    title: "Daily Conversation",
    level: "A1",
    lessons: 12,
    createdAt: "2024-10-01",
    status: "active",
  },
  {
    id: "T002",
    title: "Business English",
    level: "B1",
    lessons: 18,
    createdAt: "2024-10-10",
    status: "draft",
  },
  {
    id: "T003",
    title: "IELTS Speaking",
    level: "B2",
    lessons: 24,
    createdAt: "2024-11-02",
    status: "active",
  },
];

/* ================= HELPERS ================= */
const getLevelStyle = (level: TopicLevel) => {
  const styles = {
    A1: "bg-emerald-100 text-emerald-700 ring-emerald-600/20",
    A2: "bg-blue-100 text-blue-700 ring-blue-600/20",
    B1: "bg-amber-100 text-amber-700 ring-amber-600/20",
    B2: "bg-orange-100 text-orange-700 ring-orange-600/20",
    C1: "bg-rose-100 text-rose-700 ring-rose-600/20",
  };
  return styles[level] || "bg-gray-100 text-gray-700";
};

/* ================= COMPONENT ================= */
export default function TopicsClient() {
  const [query, setQuery] = useState("");
  // State quản lý việc sửa Topic
  const [editingTopicId, setEditingTopicId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = (id: string) => {
    setEditingTopicId(id);
    setIsEditModalOpen(true);
  };
  const filteredTopics = useMemo(() => {
    return MOCK_TOPICS.filter((t) =>
      t.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-8">
      {/* ===== Header & Stats ===== */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">
            Topics Library
          </h1>
          <p className="text-gray-500 mt-1">
            Manage learning paths and curriculum levels.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-3 rounded-2xl bg-white border border-gray-100 p-4 shadow-sm ring-1 ring-gray-50">
            <div className="p-2 bg-[#34DBC5]/10 rounded-xl text-[#34DBC5]">
              <BookOpen size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Total
              </p>
              <p className="text-xl font-black text-gray-900">
                {MOCK_TOPICS.length}
              </p>
            </div>
          </div>

          <TopicFormModal
            trigger={
              <button className="flex items-center gap-2 rounded-2xl bg-gray-900 px-6 py-4 text-white font-bold transition-all hover:bg-black active:scale-95 shadow-lg shadow-gray-200">
                <Plus size={20} />
                New Topic
              </button>
            }
          />
        </div>
      </div>

      {/* ===== Toolbar ===== */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full sm:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-[#34DBC5]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by topic title..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#34DBC5]/10 focus:border-[#34DBC5] transition-all"
          />
        </div>

        <div className="flex gap-2 text-sm font-medium text-gray-500">
          <span className="flex items-center gap-1">
            <Layers size={14} /> All Levels
          </span>
        </div>
      </div>

      {/* ===== Topics Table ===== */}
      <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-xl shadow-gray-200/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-xs font-bold uppercase tracking-widest text-gray-400">
                <th className="px-6 py-5">Topic Info</th>
                <th className="px-6 py-5">Level</th>
                <th className="px-6 py-5">Curriculum</th>
                <th className="px-6 py-5">Date Created</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50 font-medium">
              {filteredTopics.map((t) => (
                <tr
                  key={t.id}
                  className="group transition-colors hover:bg-gray-50/80"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {t.title}
                      </p>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">
                        {t.id}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-black ring-1 ring-inset ${getLevelStyle(t.level)}`}
                    >
                      {t.level}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="text-sm font-bold">{t.lessons}</span>
                      <span className="text-xs text-gray-400 uppercase font-bold tracking-tighter">
                        Lessons
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold">
                      <Calendar size={14} className="opacity-40" />
                      {new Date(t.createdAt).toLocaleDateString("en-GB")}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                        t.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${t.status === "active" ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
                      />
                      {t.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-2 rounded-xl hover:bg-white hover:shadow-sm focus:outline-none transition-all">
                        <MoreVertical size={18} className="text-gray-400" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-48 p-2 rounded-2xl shadow-2xl border-gray-100 bg-white"
                      >
                        <DropdownMenuItem className="flex items-center gap-2 rounded-xl py-2.5 cursor-pointer">
                          <Eye size={16} className="text-gray-400" />  View
                          Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => handleEditClick(t.id)}
                          className="flex items-center gap-2 rounded-xl py-2.5 cursor-pointer"
                        >
                          <Edit3 size={16} className="mr-2" /> Edit Content
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="opacity-50" />
                        <DropdownMenuItem className="flex items-center gap-2 rounded-xl py-2.5 cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600">
                          <Trash2 size={16} /> Delete Topic
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== Empty State ===== */}
        {filteredTopics.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-4">
              <Search size={40} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No topics found</h3>
            <p className="text-gray-500 max-w-xs mx-auto">
              We couldn&apos;t find any topics matching your current search
              criteria.
            </p>
          </div>
        )}
        {/* Đặt Modal ở ngoài cùng của return để tránh lỗi render lồng nhau */}
        {editingTopicId && (
          <EditTopicModal
            topicId={editingTopicId}
            open={isEditModalOpen}
            onOpenChange={setIsEditModalOpen}
          />
        )}
      </div>
    </div>
  );
}
