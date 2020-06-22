declare module 'markdown-it-mathjax' {
  import MarkdownIt from 'markdown-it/lib'
  import { MathJaxOptions } from './interface'
  const markdownItMathJax: MarkdownIt.PluginWithOptions<MathJaxOptions>
  export = markdownItMathJax
}
