/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo, useRef } from 'react'
import { DocumentLengthLimitReachedAlert } from './document-length-limit-reached-alert'
import { useConvertMarkdownToReactDom } from './hooks/use-convert-markdown-to-react-dom'
import './markdown-renderer.scss'
import type { LineMarkerPosition } from './markdown-extension/linemarker/types'
import { useTranslation } from 'react-i18next'
import type { LineMarkers } from './markdown-extension/linemarker/add-line-marker-markdown-it-plugin'
import { useCalculateLineMarkerPosition } from './utils/calculate-line-marker-positions'
import { useExtractFirstHeadline } from './hooks/use-extract-first-headline'
import type { TocAst } from 'markdown-it-toc-done-right'
import { useOnRefChange } from './hooks/use-on-ref-change'
import { useTrimmedContent } from './hooks/use-trimmed-content'
import type { CommonMarkdownRendererProps } from './common-markdown-renderer-props'
import { LinemarkerMarkdownExtension } from './markdown-extension/linemarker/linemarker-markdown-extension'
import { GistMarkdownExtension } from './markdown-extension/gist/gist-markdown-extension'
import { YoutubeMarkdownExtension } from './markdown-extension/youtube/youtube-markdown-extension'
import { VimeoMarkdownExtension } from './markdown-extension/vimeo/vimeo-markdown-extension'
import { AsciinemaMarkdownExtension } from './markdown-extension/asciinema/asciinema-markdown-extension'
import { ProxyImageMarkdownExtension } from './markdown-extension/image/proxy-image-markdown-extension'
import { CsvTableMarkdownExtension } from './markdown-extension/csv/csv-table-markdown-extension'
import { AbcjsMarkdownExtension } from './markdown-extension/abcjs/abcjs-markdown-extension'
import { SequenceDiagramMarkdownExtension } from './markdown-extension/sequence-diagram/sequence-diagram-markdown-extension'
import { FlowchartMarkdownExtension } from './markdown-extension/flowchart/flowchart-markdown-extension'
import { MermaidMarkdownExtension } from './markdown-extension/mermaid/mermaid-markdown-extension'
import { GraphvizMarkdownExtension } from './markdown-extension/graphviz/graphviz-markdown-extension'
import { MarkmapMarkdownExtension } from './markdown-extension/markmap/markmap-markdown-extension'
import { VegaLiteMarkdownExtension } from './markdown-extension/vega-lite/vega-lite-markdown-extension'
import { BlockquoteExtraTagMarkdownExtension } from './markdown-extension/blockquote/blockquote-extra-tag-markdown-extension'
import { HighlightedCodeMarkdownExtension } from './markdown-extension/highlighted-fence/highlighted-code-markdown-extension'
import { KatexMarkdownExtension } from './markdown-extension/katex/katex-markdown-extension'
import { TaskListMarkdownExtension } from './markdown-extension/task-list/task-list-markdown-extension'
import { HeadlineAnchorsMarkdownExtension } from './markdown-extension/headline-anchors-markdown-extension'
import { PlantumlMarkdownExtension } from './markdown-extension/plantuml-markdown-extension'
import { LegacyShortcodesMarkdownExtension } from './markdown-extension/legacy-short-codes/legacy-shortcodes-markdown-extension'
import { TableOfContentsMarkdownExtension } from './markdown-extension/table-of-contents-markdown-extension'
import { EmojiMarkdownExtension } from './markdown-extension/emoji/emoji-markdown-extension'
import { GenericSyntaxMarkdownExtension } from './markdown-extension/generic-syntax-markdown-extension'
import { AlertMarkdownExtension } from './markdown-extension/alert-markdown-extension'
import { SpoilerMarkdownExtension } from './markdown-extension/spoiler-markdown-extension'
import { store } from '../../redux'
import { LinkifyFixMarkdownExtension } from './markdown-extension/linkify-fix-markdown-extension'
import { DebuggerMarkdownExtension } from './markdown-extension/debugger-markdown-extension'
import { LinkAdjustmentMarkdownExtension } from './markdown-extension/link-replacer/link-adjustment-markdown-extension'

export interface DocumentMarkdownRendererProps extends CommonMarkdownRendererProps {
  onLineMarkerPositionChanged?: (lineMarkerPosition: LineMarkerPosition[]) => void
}

export const DocumentMarkdownRenderer: React.FC<DocumentMarkdownRendererProps> = ({
  className,
  content,
  onFirstHeadingChange,
  onLineMarkerPositionChanged,
  onTaskCheckedChange,
  onTocChange,
  baseUrl,
  onImageClick,
  outerContainerRef,
  useAlternativeBreaks,
  lineOffset
}) => {
  const markdownBodyRef = useRef<HTMLDivElement>(null)
  const currentLineMarkers = useRef<LineMarkers[]>()
  const tocAst = useRef<TocAst>()
  const [trimmedContent, contentExceedsLimit] = useTrimmedContent(content)

  const extensions = useMemo(() => {
    return [
      new TableOfContentsMarkdownExtension(onTocChange),
      new HeadlineAnchorsMarkdownExtension(),
      new VegaLiteMarkdownExtension(),
      new MarkmapMarkdownExtension(),
      new LinemarkerMarkdownExtension((lineMarkers) => (currentLineMarkers.current = lineMarkers), lineOffset),
      new GistMarkdownExtension(),
      new YoutubeMarkdownExtension(),
      new VimeoMarkdownExtension(),
      new AsciinemaMarkdownExtension(),
      new ProxyImageMarkdownExtension(onImageClick),
      new CsvTableMarkdownExtension(),
      new AbcjsMarkdownExtension(),
      new SequenceDiagramMarkdownExtension(),
      new FlowchartMarkdownExtension(),
      new MermaidMarkdownExtension(),
      new GraphvizMarkdownExtension(),
      new BlockquoteExtraTagMarkdownExtension(),
      new LinkAdjustmentMarkdownExtension(baseUrl),
      new KatexMarkdownExtension(),
      new TaskListMarkdownExtension(lineOffset, onTaskCheckedChange),
      new PlantumlMarkdownExtension(store.getState().config.plantumlServer),
      new LegacyShortcodesMarkdownExtension(),
      new EmojiMarkdownExtension(),
      new GenericSyntaxMarkdownExtension(),
      new AlertMarkdownExtension(),
      new SpoilerMarkdownExtension(),
      new LinkifyFixMarkdownExtension(),
      new DebuggerMarkdownExtension(),
      new HighlightedCodeMarkdownExtension()
    ]
  }, [baseUrl, lineOffset, onImageClick, onTaskCheckedChange, onTocChange])
  const markdownReactDom = useConvertMarkdownToReactDom(trimmedContent, extensions, useAlternativeBreaks)

  useTranslation()
  useCalculateLineMarkerPosition(
    markdownBodyRef,
    currentLineMarkers.current,
    onLineMarkerPositionChanged,
    markdownBodyRef.current?.offsetTop ?? 0
  )
  useExtractFirstHeadline(markdownBodyRef, content, onFirstHeadingChange)
  useOnRefChange(tocAst, onTocChange)

  return (
    <div ref={outerContainerRef} className={'position-relative'}>
      <DocumentLengthLimitReachedAlert show={contentExceedsLimit} />
      <div
        ref={markdownBodyRef}
        className={`${className ?? ''} markdown-body w-100 d-flex flex-column align-items-center`}>
        {markdownReactDom}
      </div>
    </div>
  )
}

export default DocumentMarkdownRenderer
