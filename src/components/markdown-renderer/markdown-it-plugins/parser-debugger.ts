import MarkdownIt from 'markdown-it/lib'

export const MarkdownItParserDebugger = (onDebugOutput: ((output: string) => void)): MarkdownIt.PluginSimple => {
  return (md: MarkdownIt) => {
    if (process.env.NODE_ENV !== 'production') {
      md.core.ruler.push('test', (state) => {
        onDebugOutput(JSON.stringify(state))
        return true
      })
    }
  }
}
