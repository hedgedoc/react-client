import { DomElement } from 'domhandler'
import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import abbreviation from 'markdown-it-abbr'
import markdownItContainer from 'markdown-it-container'
import definitionList from 'markdown-it-deflist'
import emoji from 'markdown-it-emoji'
import footnote from 'markdown-it-footnote'
import inserted from 'markdown-it-ins'
import marked from 'markdown-it-mark'
import markdownItRegex from 'markdown-it-regex'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import taskList from 'markdown-it-task-lists'
import toc from 'markdown-it-table-of-contents'
import React, { ReactElement, useMemo } from 'react'
import ReactHtmlParser, { convertNodeToElement, Transform } from 'react-html-parser'
import { createRenderContainer, validAlertLevels } from './container-plugins/alert'
import { MarkdownItParserDebugger } from './markdown-it-plugins/parser-debugger'
import './markdown-renderer.scss'
import { replaceGistLink } from './regex-plugins/replace-gist-link'
import { replaceLegacyGistShortCode } from './regex-plugins/replace-legacy-gist-short-code'
import { replaceLegacySlideshareShortCode } from './regex-plugins/replace-legacy-slideshare-short-code'
import { replaceLegacySpeakerdeckShortCode } from './regex-plugins/replace-legacy-speakerdeck-short-code'
import { replaceLegacyVimeoShortCode } from './regex-plugins/replace-legacy-vimeo-short-code'
import { replaceLegacyYoutubeShortCode } from './regex-plugins/replace-legacy-youtube-short-code'
import { replacePdfShortCode } from './regex-plugins/replace-pdf-short-code'
import { replaceVimeoLink } from './regex-plugins/replace-vimeo-link'
import { replaceYouTubeLink } from './regex-plugins/replace-youtube-link'
import { getGistReplacement } from './replace-components/gist/gist-frame'
import { getPDFReplacement } from './replace-components/pdf/pdf-frame'
import { getVimeoReplacement } from './replace-components/vimeo/vimeo-frame'
import { getYouTubeReplacement } from './replace-components/youtube/youtube-frame'

export interface MarkdownPreviewProps {
  content: string
}

export type SubNodeConverter = (node: DomElement, index: number) => ReactElement
export type ComponentReplacer = (node: DomElement, counterMap: Map<string, number>, nodeConverter: SubNodeConverter) => (ReactElement | undefined);
const allComponentReplacers: ComponentReplacer[] = [getYouTubeReplacement, getVimeoReplacement, getGistReplacement, getPDFReplacement]
type ComponentReplacer2Identifier2CounterMap = Map<ComponentReplacer, Map<string, number>>

const tryToReplaceNode = (node: DomElement, componentReplacer2Identifier2CounterMap: ComponentReplacer2Identifier2CounterMap, nodeConverter: SubNodeConverter) => {
  return allComponentReplacers
    .map((componentReplacer) => {
      const identifier2CounterMap = componentReplacer2Identifier2CounterMap.get(componentReplacer) || new Map<string, number>()
      return componentReplacer(node, identifier2CounterMap, nodeConverter)
    })
    .find((replacement) => !!replacement)
}

const MarkdownRenderer: React.FC<MarkdownPreviewProps> = ({ content }) => {
  const markdownIt = useMemo(() => {
    const md = new MarkdownIt('default', {
      html: true,
      breaks: true,
      langPrefix: '',
      typographer: true
    })
    md.use(taskList)
    md.use(emoji)
    md.use(abbreviation)
    md.use(definitionList)
    md.use(subscript)
    md.use(superscript)
    md.use(inserted)
    md.use(marked)
    md.use(footnote)
    md.use(anchor, {
      permalink: true,
      permalinkBefore: true,
      permalinkClass: 'heading-anchor text-dark',
      permalinkSymbol: '<i class="fa fa-link"></i>'
    })
    md.use(toc, {
      markerPattern: /^\[TOC]$/i
    })
    md.use(markdownItRegex, replaceLegacyYoutubeShortCode)
    md.use(markdownItRegex, replaceLegacyVimeoShortCode)
    md.use(markdownItRegex, replaceLegacyGistShortCode)
    md.use(markdownItRegex, replaceLegacySlideshareShortCode)
    md.use(markdownItRegex, replaceLegacySpeakerdeckShortCode)
    md.use(markdownItRegex, replacePdfShortCode)
    md.use(markdownItRegex, replaceYouTubeLink)
    md.use(markdownItRegex, replaceVimeoLink)
    md.use(markdownItRegex, replaceGistLink)
    md.use(MarkdownItParserDebugger)

    validAlertLevels.forEach(level => {
      md.use(markdownItContainer, level, { render: createRenderContainer(level) })
    })

    return md
  }, [])

  const result: ReactElement[] = useMemo(() => {
    const componentReplacer2Identifier2CounterMap = new Map<ComponentReplacer, Map<string, number>>()
    const html: string = markdownIt.render(content)
    const transform: Transform = (node, index) => {
      const maybeReplacement = tryToReplaceNode(node, componentReplacer2Identifier2CounterMap,
        (subNode, subIndex) => convertNodeToElement(subNode, subIndex, transform))
      return maybeReplacement || convertNodeToElement(node, index, transform)
    }
    return ReactHtmlParser(html, { transform: transform })
  }, [content, markdownIt])

  return (
    <div className={'bg-light container-fluid flex-fill h-100 overflow-y-scroll pb-5'}>
      <div className={'markdown-body container-fluid'}>{result}</div>
    </div>
  )
}

export { MarkdownRenderer }
