import markdownItTaskLists from '@hedgedoc/markdown-it-task-lists'
import yaml from 'js-yaml'
import MarkdownIt from 'markdown-it'
import abbreviation from 'markdown-it-abbr'
import anchor from 'markdown-it-anchor'
import markdownItContainer from 'markdown-it-container'
import definitionList from 'markdown-it-deflist'
import emoji from 'markdown-it-emoji'
import footnote from 'markdown-it-footnote'
import frontmatter from 'markdown-it-front-matter'
import imsize from 'markdown-it-imsize'
import inserted from 'markdown-it-ins'
import marked from 'markdown-it-mark'
import mathJax from 'markdown-it-mathjax'
import plantuml from 'markdown-it-plantuml'
import markdownItRegex from 'markdown-it-regex'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import toc from 'markdown-it-toc-done-right'
import { TocAst } from '../../external-types/markdown-it-toc-done-right/interface'
import { store } from '../../redux'
import { slugify } from '../editor/table-of-contents/table-of-contents'
import { RawYAMLMetadata } from '../editor/yaml-metadata/yaml-metadata'
import { createRenderContainer, validAlertLevels } from './markdown-it-plugins/alert-container'
import { combinedEmojiData } from './markdown-it-plugins/emoji/mapping'
import { highlightedCode } from './markdown-it-plugins/highlighted-code'
import { LineMarkers, lineNumberMarker } from './markdown-it-plugins/line-number-marker'
import { linkifyExtra } from './markdown-it-plugins/linkify-extra'
import { MarkdownItParserDebugger } from './markdown-it-plugins/parser-debugger'
import { plantumlError } from './markdown-it-plugins/plantuml-error'
import { replaceAsciinemaLink } from './regex-plugins/replace-asciinema-link'
import { replaceGistLink } from './regex-plugins/replace-gist-link'
import { replaceLegacyGistShortCode } from './regex-plugins/replace-legacy-gist-short-code'
import { replaceLegacySlideshareShortCode } from './regex-plugins/replace-legacy-slideshare-short-code'
import { replaceLegacySpeakerdeckShortCode } from './regex-plugins/replace-legacy-speakerdeck-short-code'
import { replaceLegacyVimeoShortCode } from './regex-plugins/replace-legacy-vimeo-short-code'
import { replaceLegacyYoutubeShortCode } from './regex-plugins/replace-legacy-youtube-short-code'
import { replacePdfShortCode } from './regex-plugins/replace-pdf-short-code'
import { replaceQuoteExtraAuthor } from './regex-plugins/replace-quote-extra-author'
import { replaceQuoteExtraColor } from './regex-plugins/replace-quote-extra-color'
import { replaceQuoteExtraTime } from './regex-plugins/replace-quote-extra-time'
import { replaceVimeoLink } from './regex-plugins/replace-vimeo-link'
import { replaceYouTubeLink } from './regex-plugins/replace-youtube-link'

export const basicMarkdownRender = (): MarkdownIt => {
  const md = basicMarkdownConfigurator()
  return configureLinkfyExtra(md)
}

export const fullMarkdownRender = (
  useFrontmatter: boolean,
  onYamlError: (error: boolean) => void,
  onRawMeta: (rawMeta: RawYAMLMetadata) => void,
  onToc: (toc: TocAst) => void,
  onLineMarkers: (lineMarkers: LineMarkers[]) => void
): MarkdownIt => {
  const md = fullMarkdownConfigurator(
    useFrontmatter,
    onYamlError,
    onRawMeta,
    onToc,
    onLineMarkers
  )
  return configureLinkfyExtra(md)
}

const basicMarkdownConfigurator = (): MarkdownIt => {
  const md = new MarkdownIt('default', {
    html: true,
    breaks: true,
    langPrefix: '',
    typographer: true
  })

  md.use(emoji, {
    defs: combinedEmojiData
  })
  md.use(abbreviation)
  md.use(definitionList)
  md.use(subscript)
  md.use(superscript)
  md.use(inserted)
  md.use(marked)
  md.use(footnote)
  md.use(imsize)

  return md
}

const fullMarkdownConfigurator = (
  useFrontmatter: boolean,
  onYamlError: (error: boolean) => void,
  onRawMeta: (rawMeta: RawYAMLMetadata) => void,
  onToc: (toc: TocAst) => void,
  onLineMarkers: (lineMarkers: LineMarkers[]) => void
): MarkdownIt => {
  const md = basicMarkdownConfigurator()

  const plantumlServer = store.getState().config.plantumlServer

  md.use(markdownItTaskLists, { lineNumber: true })
  if (plantumlServer) {
    md.use(plantuml, {
      openMarker: '```plantuml',
      closeMarker: '```',
      server: plantumlServer
    })
  } else {
    md.use(plantumlError)
  }

  if (useFrontmatter) {
    md.use(frontmatter, (rawMeta: string) => {
      try {
        const meta: RawYAMLMetadata = yaml.safeLoad(rawMeta) as RawYAMLMetadata
        onYamlError(false)
        onRawMeta(meta)
      } catch (e) {
        console.error(e)
        onYamlError(true)
        onRawMeta({} as RawYAMLMetadata)
      }
    })
  }
  // noinspection CheckTagEmptyBody
  md.use(anchor, {
    permalink: true,
    permalinkBefore: true,
    permalinkClass: 'heading-anchor text-dark',
    permalinkSymbol: '<i class="fa fa-link"></i>'
  })
  md.use(mathJax({
    beforeMath: '<app-katex>',
    afterMath: '</app-katex>',
    beforeInlineMath: '<app-katex inline>',
    afterInlineMath: '</app-katex>',
    beforeDisplayMath: '<app-katex>',
    afterDisplayMath: '</app-katex>'
  }))
  md.use(markdownItRegex, replaceLegacyYoutubeShortCode)
  md.use(markdownItRegex, replaceLegacyVimeoShortCode)
  md.use(markdownItRegex, replaceLegacyGistShortCode)
  md.use(markdownItRegex, replaceLegacySlideshareShortCode)
  md.use(markdownItRegex, replaceLegacySpeakerdeckShortCode)
  md.use(markdownItRegex, replacePdfShortCode)
  md.use(markdownItRegex, replaceAsciinemaLink)
  md.use(markdownItRegex, replaceYouTubeLink)
  md.use(markdownItRegex, replaceVimeoLink)
  md.use(markdownItRegex, replaceGistLink)
  md.use(highlightedCode)
  md.use(markdownItRegex, replaceQuoteExtraAuthor)
  md.use(markdownItRegex, replaceQuoteExtraColor)
  md.use(markdownItRegex, replaceQuoteExtraTime)
  md.use(toc, {
    placeholder: '(\\[TOC\\]|\\[toc\\])',
    listType: 'ul',
    level: [1, 2, 3],
    callback: (code: string, ast: TocAst): void => {
      onToc(ast)
    },
    slugify: slugify
  })
  validAlertLevels.forEach(level => {
    md.use(markdownItContainer, level, { render: createRenderContainer(level) })
  })
  md.use(lineNumberMarker(), {
    postLineMarkers: (lineMarkers) => {
      onLineMarkers(lineMarkers)
    }
  })
  return md
}

export const configureLinkfyExtra = (md: MarkdownIt): MarkdownIt => {
  md.use(linkifyExtra)
  if (process.env.NODE_ENV !== 'production') {
    md.use(MarkdownItParserDebugger)
  }

  return md
}
