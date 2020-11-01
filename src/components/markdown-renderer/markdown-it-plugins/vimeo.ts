import MarkdownIt from 'markdown-it'
import markdownItRegex from 'markdown-it-regex'
import { replaceLegacyVimeoShortCode } from '../replace-components/vimeo/replace-legacy-vimeo-short-code'
import { replaceVimeoLink } from '../replace-components/vimeo/replace-vimeo-link'

export const vimeo: MarkdownIt.PluginSimple = (markdownIt) => {
  markdownItRegex(markdownIt, replaceVimeoLink)
  markdownItRegex(markdownIt, replaceLegacyVimeoShortCode)
}
