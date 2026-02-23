"use client";

import { useState } from "react";
import DictationPanel from "./dictation-panel";
import ShadowingPanel from "./shadowing-panel";

type ReviewTab = "dictation" | "shadowing";

export default function ReviewTabs() {
  const [tab, setTab] = useState<ReviewTab>("dictation");

  const tabs: { key: ReviewTab; label: string }[] = [
    { key: "dictation", label: "Dictation" },
    { key: "shadowing", label: "Shadowing" },
  ];

  return (
    <>
    <div className="mb-8">
      <h1 className="text-3xl font-black text-gray-900 mb-2">Your Reviews</h1>
      <p className="text-gray-500">
        Practice your listening and speaking skills with personalized reviews.
      </p>
    </div>
      {/* Tabs */}
      <div className="mb-8 flex gap-4">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`rounded-full px-6 py-2 text-sm font-medium transition ${
              tab === key
                ? "bg-[#34DBC5] text-white"
                : "bg-white text-gray-500 hover:bg-gray-100"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "dictation" && <DictationPanel />}
      {tab === "shadowing" && <ShadowingPanel />}
    </>
  );
}
