import VocabularyStatusBadge from "./VocabularyStatusBadge"

type VocabularyItem = {
  id?: string
  word: string
  meaning: string
  userVocabulary?: {
    status: string
  } | null
}

type Props = {
  vocabularies: VocabularyItem[]
}

export default function VocabularyList({ vocabularies }: Props) {

  if (!vocabularies || vocabularies.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No vocabulary yet.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {vocabularies.map((v) => (
        <div
          key={v.id ?? v.word}
          className="
            border rounded-lg
            p-4
            flex justify-between
            items-center
          "
        >

          <div>
            <p className="font-medium">
              {v.word}
            </p>

            <p className="text-sm text-gray-500">
              {v.meaning}
            </p>
          </div>

          {v.userVocabulary?.status && (
            <VocabularyStatusBadge
              status={v.userVocabulary.status}
            />
          )}

        </div>
      ))}
    </div>
  )
}