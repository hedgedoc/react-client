import mermaid from 'mermaid'

export const setUpMermaid = ():Promise<void> => {
  return new Promise((resolve) => {
    mermaid.initialize({ startOnLoad: true })
    resolve()
  })
}
