type Props = {
  onReview: (quality: number) => void
}

export default function ReviewButtons({ onReview }: Props) {

  return (

    <div className="flex gap-4 mt-6">

      <button
        onClick={() => onReview(1)}
        className="
          bg-red-500
          text-white
          px-4 py-2
          rounded-lg
        "
      >
        Again
      </button>

      <button
        onClick={() => onReview(4)}
        className="
          bg-yellow-500
          text-white
          px-4 py-2
          rounded-lg
        "
      >
        Good
      </button>

      <button
        onClick={() => onReview(5)}
        className="
          bg-green-500
          text-white
          px-4 py-2
          rounded-lg
        "
      >
        Easy
      </button>

    </div>

  )
}