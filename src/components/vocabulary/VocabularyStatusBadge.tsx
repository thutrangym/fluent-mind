type Props = {
  status: string
}

const colors: Record<string, string> = {

  new: "bg-gray-200 text-gray-700",

  learning: "bg-blue-200 text-blue-800",

  reviewing: "bg-yellow-200 text-yellow-800",

  young: "bg-green-200 text-green-800",

  mastered: "bg-purple-200 text-purple-800"
}

export default function VocabularyStatusBadge({ status }: Props) {

  return (

    <span
      className={`
        px-3 py-1
        text-xs
        rounded-full
        ${colors[status] || "bg-gray-100"}
      `}
    >
      {status}
    </span>

  )
}