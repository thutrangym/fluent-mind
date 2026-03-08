"use client";

import { useEffect, useState } from "react";
import DeckCard from "./DeckCard";
import { FolderOpen } from "lucide-react";
import Link from "next/link";

export default function MyDecks() {
  const [decks, setDecks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/vocabulary/deck")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setDecks(data);
      })
      .catch((e) => {
        console.error(e);
        setDecks([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-32 rounded-xl bg-gray-100 animate-pulse border"></div>
        ))}
      </div>
    );
  }

  if (decks.length === 0) {
    return (
      <div className="border border-dashed rounded-xl p-8 text-center text-gray-500 bg-gray-50/50 flex flex-col items-center">
        <FolderOpen className="w-8 h-8 text-gray-400 mb-2" />
        <p className="mb-4">You haven&apos;t added any decks yet.</p>
        <Link
          href="/vocabulary/decks"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Create your first Deck
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {decks.map((deck) => (
        <DeckCard key={deck.id} deck={deck} />
      ))}
    </div>
  );
}