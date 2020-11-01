export const slugify = (content: string): string => {
  return encodeURIComponent(String(content).trim().toLowerCase().replace(/\s+/g, '-'))
}
