"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const now = new Date();

  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const diff = end.getTime() - now.getTime();

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}


export default function Countdown() {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft());
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthLabel = currentDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
  function prevMonth() {
  setCurrentDate(
    new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
  );
}

function nextMonth() {
  setCurrentDate(
    new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
  );
}

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const now = new Date();
  const month = now.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const items = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div className="rounded-xl border bg-purple-50 p-6 text-center">
      <p className="mb-3 text-sm text-purple-600">Leaderboard closes in:</p>

      <div className="flex justify-center gap-4 text-sm">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-lg bg-white px-4 py-2 shadow"
          >
            <p className="text-xl font-bold text-purple-700">
              {item.value.toString().padStart(2, "0")}
            </p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
  <button
    onClick={prevMonth}
    className="rounded-lg border px-3 py-1 hover:bg-purple-100 transition"
  >
    ← Previous Month
  </button>

  <span className="font-medium text-purple-600">
    {monthLabel}
  </span>

  <button
    onClick={nextMonth}
    className="rounded-lg border px-3 py-1 hover:bg-purple-100 transition"
  >
    Next Month →
  </button>
</div>
    </div>
  );
}
