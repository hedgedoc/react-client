/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useConvertMarkdownToReactDom } from './hooks/use-convert-markdown-to-react-dom'
import type { LineMarkerPosition } from './markdown-extension/linemarker/types'
import { useTranslation } from 'react-i18next'
import type { LineMarkers } from './markdown-extension/linemarker/add-line-marker-markdown-it-plugin'
import { useCalculateLineMarkerPosition } from './utils/calculate-line-marker-positions'
import { useExtractFirstHeadline } from './hooks/use-extract-first-headline'
import type { CommonMarkdownRendererProps } from './common-markdown-renderer-props'
import { useMarkdownExtensions } from './hooks/use-markdown-extensions'
import { HeadlineAnchorsMarkdownExtension } from './markdown-extension/headline-anchors-markdown-extension'
import { cypressId } from '../../utils/cypress-attribute'
import type { TocAst } from 'markdown-it-toc-done-right'

export interface DocumentMarkdownRendererProps extends CommonMarkdownRendererProps {
  onLineMarkerPositionChanged?: (lineMarkerPosition: LineMarkerPosition[]) => void
}

export const DocumentMarkdownRenderer: React.FC<DocumentMarkdownRendererProps> = ({
  className,
  markdownContentLines,
  onFirstHeadingChange,
  onLineMarkerPositionChanged,
  onTocChange,
  baseUrl,
  outerContainerRef,
  newlinesAreBreaks
}) => {
  const [tocAst, setTocAst] = useState<TocAst>()
  const markdownBodyRef = useRef<HTMLDivElement>(null)
  const currentLineMarkers = useRef<LineMarkers[]>()

  const extensions = useMarkdownExtensions(
    baseUrl,
    currentLineMarkers,
    useMemo(() => [new HeadlineAnchorsMarkdownExtension()], []),
    setTocAst
  )
  const markdownReactDom = useConvertMarkdownToReactDom(markdownContentLines, extensions, newlinesAreBreaks)

  useEffect(() => {
    onTocChange?.(tocAst)
  }, [onTocChange, tocAst])

  useTranslation()
  useCalculateLineMarkerPosition(
    markdownBodyRef,
    currentLineMarkers.current,
    onLineMarkerPositionChanged,
    markdownBodyRef.current?.offsetTop ?? 0
  )
  const extractFirstHeadline = useExtractFirstHeadline(markdownBodyRef, onFirstHeadingChange)
  useEffect(() => {
    extractFirstHeadline()
  }, [extractFirstHeadline, markdownContentLines])

  return (
    <div ref={outerContainerRef} className={`position-relative`}>
      <div
        {...cypressId('markdown-body')}
        ref={markdownBodyRef}
        data-word-count-target={true}
        className={`${className ?? ''} markdown-body w-100 d-flex flex-column align-items-center`}>
        {markdownReactDom}
      </div>
    </div>
  )
}
