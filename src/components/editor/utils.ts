export const isMac = navigator.platform.toLowerCase().includes('mac')

export const removeHTMLTag = (input: string): string => {
  return input.replace(/(?:<(?:[^>]+)>)/gi, '')
}

export const removeMarkdownSyntax = (input: string): string => {
  return input
    .replace(/\*(.*?)\*/gi, '$1') // bold & italic
    .replace(/\+\+(.*?)\+\+/gi, '$1') // underline
    .replace(/~(.*?)~/gi, '$1') // subscript & strikethrough
    .replace(/\^(.*?)\^/gi, '$1') // superscript
    .replace(/`(.*?)`/gi, '$1') // code
    .replace(/!?\[(.*?)]\(.*?\)/gi, '$1') // link & image
}
