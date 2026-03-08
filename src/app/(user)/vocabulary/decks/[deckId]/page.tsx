"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import VocabularyList from "@/src/components/vocabulary/VocabularyList";
import { ArrowLeft, Play, Plus } from "lucide-react";

type Vocabulary = {
  id?: string;
  word: string;
  meaning: string;
  example?: string;
  pronunciation?: string;
};

type VocabularyItem = {
  id?: string
  word: string
  meaning: string
  userVocabulary?: {
    status: string
  } | null
}

type Deck = {
  id: string;
  title: string;
  description?: string;
  vocabularies: Vocabulary[];
};

export default function DeckDetailPage() {
  const params = useParams();
  const deckId = params?.deckId as string;

  const router = useRouter();

  const [deck, setDeck] = useState<Deck | null>(null);
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [loading, setLoading] = useState(true);

  const [newVocab, setNewVocab] = useState<Vocabulary>({
    word: "",
    meaning: "",
    example: "",
    pronunciation: "",
  });

  const [isAdding, setIsAdding] = useState(false);

  /* ---------------- LOAD DECK ---------------- */

  const loadDeck = useCallback(async () => {
    try {
      const res = await fetch(`/api/vocabulary/deck/${deckId}`);

      if (!res.ok) {
        console.error("Failed to load deck", res.status);
        return;
      }

      const data = await res.json();

      setDeck(data);
      setVocabularies(data.vocabularies || []);
    } catch (error) {
      console.error("Load deck error:", error);
    } finally {
      setLoading(false);
    }
  }, [deckId]);

  useEffect(() => {
    if (deckId) loadDeck();
  }, [deckId, loadDeck]);

  /* ---------------- ADD VOCAB ---------------- */

  const handleAddVocab = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newVocab.word || !newVocab.meaning) return;

    try {
      setIsAdding(true);

      const res = await fetch(`/api/vocabulary/deck/${deckId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newVocab),
      });

      if (!res.ok) {
        console.error("Failed to add vocab", await res.text());
        return;
      }

      /* reset form */
      setNewVocab({
        word: "",
        meaning: "",
        example: "",
        pronunciation: "",
      });

      /* reload deck */
      loadDeck();
    } catch (error) {
      console.error("Add vocab error:", error);
    } finally {
      setIsAdding(false);
    }
  };

  /* ---------------- UI STATES ---------------- */

  if (loading) {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 w-1/4 rounded"></div>
        <div className="h-32 bg-gray-100 rounded-xl"></div>
      </div>
    );
  }

  if (!deck) {
    return (
      <div className="p-8 text-center text-gray-500">
        Deck not found
      </div>
    );
  }

  /* ---------------- PAGE ---------------- */

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">

      {/* BACK BUTTON */}

      <button
        onClick={() => router.push("/vocabulary/decks")}
        className="flex items-center text-gray-500 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Decks
      </button>

      {/* DECK HEADER */}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {deck.title}
          </h1>

          {deck.description && (
            <p className="text-gray-500 mt-2">
              {deck.description}
            </p>
          )}
        </div>

        {vocabularies.length > 0 && (
          <button
            onClick={() =>
              router.push(`/vocabulary/decks/${deckId}/learn`)
            }
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-sm"
          >
            <Play className="w-4 h-4 fill-current" />
            Learn Now
          </button>
        )}
      </div>

      {/* ADD VOCAB FORM */}

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5 text-green-600" />
          Add Vocabulary
        </h2>

        <form onSubmit={handleAddVocab} className="space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              className="border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Word (Required)"
              value={newVocab.word}
              onChange={(e) =>
                setNewVocab({
                  ...newVocab,
                  word: e.target.value,
                })
              }
              required
            />

            <input
              className="border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Meaning (Required)"
              value={newVocab.meaning}
              onChange={(e) =>
                setNewVocab({
                  ...newVocab,
                  meaning: e.target.value,
                })
              }
              required
            />

            <input
              className="border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Pronunciation"
              value={newVocab.pronunciation}
              onChange={(e) =>
                setNewVocab({
                  ...newVocab,
                  pronunciation: e.target.value,
                })
              }
            />

            <input
              className="border p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Example sentence"
              value={newVocab.example}
              onChange={(e) =>
                setNewVocab({
                  ...newVocab,
                  example: e.target.value,
                })
              }
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isAdding || !newVocab.word || !newVocab.meaning}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-6 py-2 rounded-lg transition-colors font-medium"
            >
              {isAdding ? "Adding..." : "Add to Deck"}
            </button>
          </div>

        </form>
      </div>

      {/* VOCAB LIST */}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center justify-between">
          Cards in Deck

          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {vocabularies.length} items
          </span>
        </h2>

        {vocabularies.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-xl bg-gray-50 text-gray-500">
            No vocabulary added yet. Start adding words above!
          </div>
        ) : (
          <VocabularyList vocabularies={vocabularies} />
        )}
      </div>

    </div>
  );
}