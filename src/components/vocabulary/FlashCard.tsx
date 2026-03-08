"use client"

import { useState } from "react"
import ReviewButtons from "./ReviewButtons"

type FlashCardProps = {
  card: {
    id: string
    vocabulary: {
      word: string
      meaning: string
      example?: string | null
      pronunciation?: string | null
    }
  }
  onReview: (quality: number) => void
}

export default function FlashCard({ card, onReview }: FlashCardProps) {

  const [flipped, setFlipped] = useState(false)

  return (

    <div className="flex flex-col items-center">

      <div
        onClick={() => setFlipped(!flipped)}
        className="
          w-[420px] h-[260px]
          bg-white
          shadow-lg
          rounded-xl
          flex items-center justify-center
          text-center
          cursor-pointer
          p-6
        "
      >

        {!flipped && (
          <div>
            <p className="text-2xl font-bold">
              {card.vocabulary.word}
            </p>

            {card.vocabulary.pronunciation && (
              <p className="text-gray-500 mt-2">
                /{card.vocabulary.pronunciation}/
              </p>
            )}
          </div>
        )}

        {flipped && (
          <div>

            <p className="text-xl font-semibold">
              {card.vocabulary.meaning}
            </p>

            {card.vocabulary.example && (
              <p className="text-sm text-gray-500 mt-3">
                {card.vocabulary.example}
              </p>
            )}

          </div>
        )}

      </div>

      {flipped && (
        <ReviewButtons onReview={onReview} />
      )}

    </div>

  )
}