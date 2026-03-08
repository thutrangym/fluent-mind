"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import FlashCard from "@/src/components/vocabulary/FlashCard";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function LearnPage() {
  const { deckId } = useParams();
  const router = useRouter();
  const [cards, setCards] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadCards = useCallback(async () => {
    try {
      const res = await fetch(`/api/vocabulary/deck/${deckId}`);
      if (res.ok) {
        const data = await res.json();
        // Option to filter out cards not due: currently we just show all in deck
        setCards(data.vocabularies);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [deckId]);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const handleReview = async (grade: number) => {
    if (submitting) return;
    setSubmitting(true);
    const card = cards[index];

    try {
      await fetch("/api/vocabulary/flashcards/review", {
        method: "POST",
        body: JSON.stringify({
          vocabularyId: card.id,
          grade,
        }),
      });
      setIndex((prev) => prev + 1);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 max-w-xl mx-auto flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse h-64 w-full bg-gray-100 rounded-2xl"></div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="bg-[#FAFFF6] p-8 max-w-xl mx-auto text-center space-y-4">
        <h2 className="text-xl font-semibold">No cards locally</h2>
        <p className="text-gray-500">
          Add words to this deck first before learning.
        </p>
        <button
          onClick={() => router.push(`/vocabulary/decks/${deckId}`)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (index >= cards.length) {
    return (
      <div className="bg-[#FAFFF6] p-8 max-w-xl mx-auto text-center space-y-6 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">All Done!</h2>
        <p className="text-gray-500 text-lg">
          You have reviewed all cards in this deck.
        </p>
        <button
          onClick={() => router.push(`/vocabulary/decks/${deckId}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors"
        >
          Back to Deck
        </button>
      </div>
    );
  }

  const card = cards[index];

  return (
    <main className="bg-[#FAFFF6]">
      <div className="p-6 max-w-xl mx-auto space-y-8 min-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push(`/vocabulary/decks/${deckId}`)}
            className="flex items-center text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quit Session
          </button>
          <span className="text-sm font-medium text-gray-500">
            Card {index + 1} of {cards.length}
          </span>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Pass raw card. FlashCard wrapper expects { vocabulary: ... } originally, overriding here inline to wrap the deck's vocabulary object since deck directly returns Vocabularies not UserVocabularies */}
          <FlashCard
            card={{ id: card.id, vocabulary: card }}
            onReview={handleReview}
          />
        </div>
      </div>
    </main>
  );
}
