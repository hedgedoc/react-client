import MarkdownIt from 'markdown-it'
import markdownItRegex from 'markdown-it-regex'
import { replaceAsciinemaLink } from '../replace-components/asciinema/replace-asciinema-link'

export const asciinema: MarkdownIt.PluginSimple = (markdownIt) => {
  markdownItRegex(markdownIt, replaceAsciinemaLink)
}
