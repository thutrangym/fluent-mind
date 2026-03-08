export function sm2({
  quality,
  repetitions,
  interval,
  easeFactor
}: {
  quality: number
  repetitions: number
  interval: number
  easeFactor: number
}) {

  if (quality < 3) {
    return {
      repetitions: 0,
      interval: 1,
      easeFactor
    }
  }

  const newRepetitions = repetitions + 1
  let newInterval = interval

  if (newRepetitions === 1) newInterval = 1
  else if (newRepetitions === 2) newInterval = 6
  else newInterval = Math.round(interval * easeFactor)

  const newEaseFactor =
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))

  return {
    repetitions: newRepetitions,
    interval: newInterval,
    easeFactor: Math.max(1.3, newEaseFactor)
  }
}