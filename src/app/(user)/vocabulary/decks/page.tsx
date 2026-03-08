"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle, BookOpen } from "lucide-react";

type Deck = {
  id: string;
  title: string;
  description?: string;
  vocabularies: any[];
};

export default function DecksPage() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const loadDecks = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/vocabulary/deck");
      if (!res.ok) {
        throw new Error(`Failed to load decks: ${res.statusText}`);
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setDecks(data);
      } else {
        setDecks([]);
      }
    } catch (e) {
      console.error("[loadDecks]", e);
      setDecks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDecks();
  }, []);

  const createDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    setIsCreating(true);
    try {
      const res = await fetch("/api/vocabulary/deck", {
        method: "POST",
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        setTitle("");
        setDescription("");
      } else {
        console.error("Failed to create deck", await res.text());
      }
    } catch (e) {
      console.error("[createDeck]", e);
    } finally {
      setIsCreating(false);
      loadDecks();
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Study Decks</h1>
        <p className="text-gray-500">Create new decks or manage existing ones.</p>
      </header>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-blue-600" />
          Create a New Deck
        </h2>

        <form onSubmit={createDeck} className="flex gap-4 items-start">
          <div className="flex-1 space-y-4">
            <input
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Deck title (e.g. JLPT N5 Vocabulary)"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Optional description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isCreating || !title}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {isCreating ? "Creating..." : "Create Deck"}
          </button>
        </form>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Your Decks</h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-xl border"></div>)}
          </div>
        ) : decks.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-xl bg-gray-50">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">You don&apos;t have any decks yet. Create one above to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map((deck) => (
              <Link
                key={deck.id}
                href={`/vocabulary/decks/${deck.id}`}
                className="group border p-6 rounded-xl bg-white hover:border-blue-500 hover:shadow-md transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="font-semibold text-lg text-gray-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                  {deck.title}
                </h3>
                {deck.description && (
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{deck.description}</p>
                )}
                <div className="flex items-center gap-2 mt-4 text-sm font-medium text-gray-500 bg-gray-50 w-fit px-3 py-1 rounded-full">
                  <BookOpen className="w-4 h-4" />
                  {deck.vocabularies.length} cards
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}