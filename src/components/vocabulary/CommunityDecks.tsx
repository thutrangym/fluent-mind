"use client";

import { useEffect, useState } from "react";
import DeckCard from "./DeckCard";
import { Users } from "lucide-react";

export default function CommunityDecks() {
    const [decks, setDecks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/vocabulary/community-decks")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setDecks(data);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 rounded-xl bg-gray-100 animate-pulse border"></div>
                ))}
            </div>
        );
    }

    if (decks.length === 0) {
        return (
            <div className="border border-dashed rounded-xl p-8 text-center text-gray-500 bg-gray-50/50">
                <Users className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p>No community decks available yet.</p>
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
