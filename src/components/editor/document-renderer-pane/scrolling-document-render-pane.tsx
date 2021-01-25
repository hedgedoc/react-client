/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo, useRef, useState } from 'react'
import { LineMarkerPosition } from '../../markdown-renderer/types'
import { useOnUserScroll } from '../scroll/hooks/use-on-user-scroll'
import { useScrollToLineMark } from '../scroll/hooks/use-scroll-to-line-mark'
import { ScrollProps } from '../scroll/scroll-props'
import { DocumentRenderPane, DocumentRenderPaneProps } from './document-render-pane'

type ImplementedProps =
  'onLineMarkerPositionChanged'
  | 'onScrollRenderer'
  | 'documentRenderPaneRef'
  | 'onMouseEnterRenderer'

export type ScrollingDocumentRenderPaneProps = Omit<(DocumentRenderPaneProps & ScrollProps), ImplementedProps>

export const ScrollingDocumentRenderPane: React.FC<ScrollingDocumentRenderPaneProps> = (
  {
    scrollState,
    onScroll,
    markdownContent,
    extraClasses,
    ...props
  }) => {
  const renderer = useRef<HTMLDivElement>(null)
  const [lineMarks, setLineMarks] = useState<LineMarkerPosition[]>()

  const contentLineCount = useMemo(() => markdownContent.split('\n').length, [markdownContent])
  const userScroll = useOnUserScroll(lineMarks, renderer, onScroll)
  useScrollToLineMark(scrollState, lineMarks, contentLineCount, renderer)

  return (
    <DocumentRenderPane
      extraClasses={`overflow-y-scroll h-100 ${extraClasses ?? ''}`}
      documentRenderPaneRef={renderer}
      onLineMarkerPositionChanged={setLineMarks}
      onScrollRenderer={userScroll}
      markdownContent={markdownContent}
      {...props}
    />
  )
}
