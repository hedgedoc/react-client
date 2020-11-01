import MarkdownIt from 'markdown-it'
import markdownItRegex from 'markdown-it-regex'
import { replaceGistLink } from '../replace-components/gist/replace-gist-link'
import { replaceLegacyGistShortCode } from '../replace-components/gist/replace-legacy-gist-short-code'

export const gist: MarkdownIt.PluginSimple = (markdownIt) => {
  markdownItRegex(markdownIt, replaceGistLink)
  markdownItRegex(markdownIt, replaceLegacyGistShortCode)
}
