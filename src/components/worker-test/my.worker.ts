// eslint-disable-next-line @typescript-eslint/require-await
export function expensive (time: number): number {
  const start = Date.now()
  let count = 0
  while (Date.now() - start < time) count++
  return count
}
