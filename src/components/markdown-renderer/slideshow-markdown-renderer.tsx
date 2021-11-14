/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment, useMemo, useRef } from 'react'
import { useConvertMarkdownToReactDom } from './hooks/use-convert-markdown-to-react-dom'
import './markdown-renderer.scss'
import { useExtractFirstHeadline } from './hooks/use-extract-first-headline'
import type { TocAst } from 'markdown-it-toc-done-right'
import { useOnRefChange } from './hooks/use-on-ref-change'
import { useTrimmedContent } from './hooks/use-trimmed-content'
import { REVEAL_STATUS, useReveal } from './hooks/use-reveal'
import './slideshow.scss'
import type { ScrollProps } from '../editor-page/synced-scroll/scroll-props'
import { DocumentLengthLimitReachedAlert } from './document-length-limit-reached-alert'
import type { SlideOptions } from '../common/note-frontmatter/types'
import type { CommonMarkdownRendererProps } from './common-markdown-renderer-props'
import { LoadingSlide } from './loading-slide'
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
import { PlantumlMarkdownExtension } from './markdown-extension/plantuml-markdown-extension'
import { store } from '../../redux'
import { LegacyShortcodesMarkdownExtension } from './markdown-extension/legacy-short-codes/legacy-shortcodes-markdown-extension'
import { TableOfContentsMarkdownExtension } from './markdown-extension/table-of-contents-markdown-extension'
import { EmojiMarkdownExtension } from './markdown-extension/emoji/emoji-markdown-extension'
import { GenericSyntaxMarkdownExtension } from './markdown-extension/generic-syntax-markdown-extension'
import { AlertMarkdownExtension } from './markdown-extension/alert-markdown-extension'
import { SpoilerMarkdownExtension } from './markdown-extension/spoiler-markdown-extension'
import { LinkifyFixMarkdownExtension } from './markdown-extension/linkify-fix-markdown-extension'
import { DebuggerMarkdownExtension } from './markdown-extension/debugger-markdown-extension'
import { RevealMarkdownExtension } from './markdown-extension/reveal/reveal-markdown-extension'
import { LinkAdjustmentMarkdownExtension } from './markdown-extension/link-replacer/link-adjustment-markdown-extension'

export interface SlideshowMarkdownRendererProps extends CommonMarkdownRendererProps {
  slideOptions: SlideOptions
}

export const SlideshowMarkdownRenderer: React.FC<SlideshowMarkdownRendererProps & ScrollProps> = ({
  className,
  content,
  onFirstHeadingChange,
  onTaskCheckedChange,
  onTocChange,
  baseUrl,
  onImageClick,
  useAlternativeBreaks,
  lineOffset,
  slideOptions
}) => {
  const markdownBodyRef = useRef<HTMLDivElement>(null)
  const tocAst = useRef<TocAst>()
  const [trimmedContent, contentExceedsLimit] = useTrimmedContent(content)

  const extensions = useMemo(
    () => [
      new TableOfContentsMarkdownExtension(onTocChange),
      new RevealMarkdownExtension(),
      new VegaLiteMarkdownExtension(),
      new MarkmapMarkdownExtension(),
      new LinemarkerMarkdownExtension(undefined, lineOffset),
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
      new HighlightedCodeMarkdownExtension(),
      new DebuggerMarkdownExtension()
    ],
    [baseUrl, lineOffset, onImageClick, onTaskCheckedChange, onTocChange]
  )

  const markdownReactDom = useConvertMarkdownToReactDom(trimmedContent, extensions, useAlternativeBreaks)
  const revealStatus = useReveal(content, slideOptions)

  useExtractFirstHeadline(
    markdownBodyRef,
    revealStatus === REVEAL_STATUS.INITIALISED ? content : undefined,
    onFirstHeadingChange
  )
  useOnRefChange(tocAst, onTocChange)

  const slideShowDOM = useMemo(
    () => (revealStatus === REVEAL_STATUS.INITIALISED ? markdownReactDom : <LoadingSlide />),
    [markdownReactDom, revealStatus]
  )

  return (
    <Fragment>
      <DocumentLengthLimitReachedAlert show={contentExceedsLimit} />
      <div className={'reveal'}>
        <div ref={markdownBodyRef} className={`${className ?? ''} slides`}>
          {slideShowDOM}
        </div>
      </div>
    </Fragment>
  )
}

export default SlideshowMarkdownRenderer
