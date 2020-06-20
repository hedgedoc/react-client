import MarkdownIt from 'markdown-it/lib'

export const highlightedCode: MarkdownIt.PluginSimple = (md: MarkdownIt) => {
  md.core.ruler.push('highlighted-code', (state) => {
    state.tokens.forEach(token => {
      if (token.type === 'fence' && token.info !== '') {
        token.attrJoin('language', token.info)
      }
    })
    return true
  })
}
