export function calculateWER(ref: string, hyp: string) {
  const r = ref.split(" ")
  const h = hyp.split(" ")

  const d = Array(r.length + 1)
    .fill(null)
    .map(() => Array(h.length + 1).fill(0))

  for (let i = 0; i <= r.length; i++) d[i][0] = i
  for (let j = 0; j <= h.length; j++) d[0][j] = j

  for (let i = 1; i <= r.length; i++) {
    for (let j = 1; j <= h.length; j++) {
      if (r[i - 1] === h[j - 1]) {
        d[i][j] = d[i - 1][j - 1]
      } else {
        d[i][j] = Math.min(
          d[i - 1][j] + 1,
          d[i][j - 1] + 1,
          d[i - 1][j - 1] + 1
        )
      }
    }
  }

  return d[r.length][h.length] / r.length
}