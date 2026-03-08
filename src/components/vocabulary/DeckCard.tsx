import Link from "next/link"

type Deck = {
  id: string
  title: string
  description?: string | null
  vocabularies: {
    id: string
  }[]
}

export default function DeckCard({ deck }: { deck: Deck }) {

  return (

    <Link
      href={`/vocabulary/decks/${deck.id}`}
      className="
        border rounded-xl
        p-5
        hover:shadow-md
        transition
        bg-white
      "
    >

      <h3 className="text-lg font-semibold">
        {deck.title}
      </h3>

      {deck.description && (
        <p className="text-sm text-gray-500 mt-1">
          {deck.description}
        </p>
      )}

      <p className="text-sm text-gray-400 mt-3">
        {deck.vocabularies.length} cards
      </p>

    </Link>

  )
}