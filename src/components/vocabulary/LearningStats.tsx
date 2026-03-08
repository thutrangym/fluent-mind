"use client";

import { useEffect, useState } from "react";

import {
  BookOpen,
  Calendar,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

type Stats = {
  totalCards: number;
  dueToday: number;
  totalReviews: number;
  accuracy: number;
  status: { status: string; _count: number }[];
};

export default function LearningStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/vocabulary/stats")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setStats(data);
      })
      .catch(console.error);
  }, []);

  if (!stats) {
    return (
      <div className="h-32 rounded-xl bg-gray-100 animate-pulse border"></div>
    );
  }

  const getStatusCount = (statusName: string) => {
    return stats.status.find((s) => s.status === statusName)?._count || 0;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Cards */}
        <div className="p-6 border rounded-xl bg-white shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 font-medium text-sm">Total Cards</p>
            <p className="text-3xl font-bold mt-2">{stats.totalCards}</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* Reviews Due Today */}
        <div className="p-6 border rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-sm flex items-center justify-between">
          <div>
            <p className="text-indigo-100 font-medium text-sm">Due Today</p>
            <p className="text-3xl font-bold mt-2">
              {stats.dueToday}{" "}
              <span className="text-sm font-normal text-indigo-100 ml-1">
                items
              </span>
            </p>
          </div>
          <div className="p-3 bg-white/20 rounded-full">
            <Calendar className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Total Reviews */}
        <div className="p-6 border rounded-xl bg-white shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 font-medium text-sm">Total Reviews</p>
            <p className="text-3xl font-bold mt-2">{stats.totalReviews}</p>
          </div>
          <div className="p-3 bg-green-50 text-green-600 rounded-full">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Accuracy */}
        <div className="p-6 border rounded-xl bg-white shadow-sm flex items-center justify-between">
          <div>
            <p className="text-gray-500 font-medium text-sm">Avg. Accuracy</p>
            <p className="text-3xl font-bold mt-2">{stats.accuracy.toFixed(1)}%</p>
          </div>
          <div className="p-3 bg-orange-50 text-orange-600 rounded-full">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="border rounded-xl p-6 bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Vocabulary Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
            <span className="text-2xl font-bold text-gray-700">
              {getStatusCount("new")}
            </span>
            <span className="text-xs font-medium text-gray-500 uppercase mt-1">
              New
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg">
            <span className="text-2xl font-bold text-blue-700">
              {getStatusCount("learning")}
            </span>
            <span className="text-xs font-medium text-blue-500 uppercase mt-1">
              Learning
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-yellow-50 rounded-lg">
            <span className="text-2xl font-bold text-yellow-700">
              {getStatusCount("reviewing")}
            </span>
            <span className="text-xs font-medium text-yellow-600 uppercase mt-1">
              Reviewing
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-indigo-50 rounded-lg">
            <span className="text-2xl font-bold text-indigo-700">
              {getStatusCount("young")}
            </span>
            <span className="text-xs font-medium text-indigo-500 uppercase mt-1">
              Young
            </span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg">
            <span className="text-2xl font-bold text-green-700">
              {getStatusCount("mastered")}
            </span>
            <span className="text-xs font-medium text-green-500 uppercase mt-1">
              Mastered
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}