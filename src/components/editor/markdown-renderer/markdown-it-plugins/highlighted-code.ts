import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it/lib'

export const highlightedCode: MarkdownIt.PluginSimple = (md: MarkdownIt) => {
  md.core.ruler.push('highlighted-code', (state) => {
    state.tokens.forEach(token => {
      if (token.type === 'fence' && token.info !== '' && hljs.listLanguages().indexOf(token.info) > -1) {
        token.attrJoin('language', token.info)
      }
    })
    return true
  })
}
