/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { TocAst } from 'markdown-it-toc-done-right'
import type { MutableRefObject } from 'react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useResizeObserver from 'use-resize-observer'
import { useDocumentSyncScrolling } from './hooks/sync-scroll/use-document-sync-scrolling'
import type { ScrollProps } from '../editor-page/synced-scroll/scroll-props'
import { DocumentMarkdownRenderer } from '../markdown-renderer/document-markdown-renderer'
import styles from './markdown-document.module.scss'
import { useApplicationState } from '../../hooks/common/use-application-state'
import type { RendererFrontmatterInfo } from '../../redux/note-details/types/note-details'
import type { TaskCheckedChangeCallback } from '../markdown-renderer/markdown-extension/task-list/task-list-checkbox'

export interface RendererProps extends ScrollProps {
  onFirstHeadingChange?: (firstHeading: string | undefined) => void
  onTaskCheckedChange?: TaskCheckedChangeCallback
  documentRenderPaneRef?: MutableRefObject<HTMLDivElement | null>
  markdownContentLines: string[]
  onHeightChange?: (height: number) => void
}

export interface MarkdownDocumentProps extends RendererProps {
  additionalOuterContainerClasses?: string
  additionalRendererClasses?: string
  disableToc?: boolean
  baseUrl: string
  frontmatterInfo?: RendererFrontmatterInfo
}

export const MarkdownDocument: React.FC<MarkdownDocumentProps> = ({
  additionalOuterContainerClasses,
  additionalRendererClasses,
  onFirstHeadingChange,
  onMakeScrollSource,
  baseUrl,
  markdownContentLines,
  onScroll,
  scrollState,
  onHeightChange,
  disableToc,
  frontmatterInfo
}) => {
  const rendererRef = useRef<HTMLDivElement | null>(null)
  const rendererSize = useResizeObserver({ ref: rendererRef.current })

  const [tocAst, setTocAst] = useState<TocAst>()
  const onTocChange = useCallback((ast: TocAst|undefined) => {
    setTocAst(ast)
  },[])

  const internalDocumentRenderPaneRef = useRef<HTMLDivElement>(null)

  const newlinesAreBreaks = useApplicationState((state) => state.noteDetails.frontmatter.newlinesAreBreaks)

  useEffect(() => {
    if (!onHeightChange) {
      return
    }
    onHeightChange(rendererSize.height ? rendererSize.height + 1 : 0)
  }, [rendererSize.height, onHeightChange])

  const contentLineCount = useMemo(() => markdownContentLines.length, [markdownContentLines])
  const [onLineMarkerPositionChanged, onUserScroll] = useDocumentSyncScrolling(
    internalDocumentRenderPaneRef,
    rendererRef,
    contentLineCount,
    scrollState,
    onScroll
  )

  return (
    <div
      className={`${styles['markdown-document']} ${additionalOuterContainerClasses ?? ''}`}
      ref={internalDocumentRenderPaneRef}
      onScroll={onUserScroll}
      onMouseEnter={onMakeScrollSource}>
      <div className={styles['markdown-document-side']} />
      <div className={styles['markdown-document-content']}>
        <DocumentMarkdownRenderer
          outerContainerRef={rendererRef}
          className={`mb-3 ${additionalRendererClasses ?? ''}`}
          markdownContentLines={markdownContentLines}
          onFirstHeadingChange={onFirstHeadingChange}
          onLineMarkerPositionChanged={onLineMarkerPositionChanged}
          onTocChange={onTocChange}
          baseUrl={baseUrl}
          newlinesAreBreaks={newlinesAreBreaks}
        />
      </div>
      <div className={`${styles['markdown-document-side']}`} />
    </div>
  )
}
