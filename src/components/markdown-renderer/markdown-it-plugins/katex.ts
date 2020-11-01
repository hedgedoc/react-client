import MarkdownIt from 'markdown-it'
import mathJax from 'markdown-it-mathjax'

export const katex: MarkdownIt.PluginSimple = mathJax({
  beforeMath: '<app-katex>',
  afterMath: '</app-katex>',
  beforeInlineMath: '<app-katex inline>',
  afterInlineMath: '</app-katex>',
  beforeDisplayMath: '<app-katex>',
  afterDisplayMath: '</app-katex>'
})
