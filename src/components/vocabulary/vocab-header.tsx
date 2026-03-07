"use client";

import { useState } from "react";

export default function VocabHeader() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Learn English Vocabulary</h1>
        <p className="text-sm text-gray-500">
          Master English vocabulary with spaced repetition
        </p>
      </div>

      <div className="flex gap-3">
        {/* Button */}
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-black transition"
        >
          What is Spaced Repetition?
        </button>

        {/* Popup */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-lg font-semibold">
                  What is Spaced Repetition?
                </h2>

                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-black"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                <p>
                  <strong>Spaced Repetition</strong> is a learning technique
                  that helps you remember vocabulary for a long time.
                </p>

                <p>
                  Instead of reviewing words randomly, the system shows you
                  vocabulary at increasing intervals right before you forget it.
                </p>

                <ul className="list-disc pl-5 space-y-1">
                  <li>Day 1 → Learn the word</li>
                  <li>Day 2 → Review</li>
                  <li>Day 4 → Review again</li>
                  <li>Day 7 → Review</li>
                  <li>Day 14 → Review</li>
                </ul>

                <p>
                  This method is based on the psychological principle called the{" "}
                  <strong>Spacing Effect</strong>, discovered by{" "}
                  <strong>Hermann Ebbinghaus</strong>.
                </p>

                <p>
                  Many learning platforms like{" "}
                  <strong>Anki</strong> and{" "}
                  <strong>Memrise</strong> use
                  this technique.
                </p>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
