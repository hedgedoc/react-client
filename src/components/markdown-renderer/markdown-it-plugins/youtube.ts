import MarkdownIt from 'markdown-it'
import markdownItRegex from 'markdown-it-regex'
import { replaceLegacyYoutubeShortCode } from '../replace-components/youtube/replace-legacy-youtube-short-code'
import { replaceYouTubeLink } from '../replace-components/youtube/replace-youtube-link'

export const youtube: MarkdownIt.PluginSimple = (markdownIt) => {
  markdownItRegex(markdownIt, replaceYouTubeLink)
  markdownItRegex(markdownIt, replaceLegacyYoutubeShortCode)
}
