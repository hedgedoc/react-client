import MarkdownIt from 'markdown-it'
import markdownItRegex from 'markdown-it-regex'
import { replacePdfShortCode } from '../replace-components/pdf/replace-pdf-short-code'

export const pdf: MarkdownIt.PluginSimple = (markdownIt) => {
  markdownItRegex(markdownIt, replacePdfShortCode)
}
