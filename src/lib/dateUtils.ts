export const transformToLocaleDate = (date?: string): string | undefined => {
  if (!date) return undefined
  return new Date(date).toLocaleDateString(undefined, {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}
