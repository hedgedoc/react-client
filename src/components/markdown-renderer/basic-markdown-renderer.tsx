/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import MarkdownIt from 'markdown-it'
import React, { ReactElement, RefObject, useMemo, useRef } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../redux'
import { DocumentLengthLimitReachedAlert } from './document-length-limit-reached-alert'
import './markdown-renderer.scss'
import { ComponentReplacer } from './replace-components/ComponentReplacer'
import { AdditionalMarkdownRendererProps, LineKeys } from './types'
import { buildTransformer } from './utils/html-react-transformer'
import { calculateNewLineNumberMapping } from './utils/line-number-mapping'

export interface BasicMarkdownRendererProps {
  componentReplacers?: () => ComponentReplacer[],
  markdownIt: MarkdownIt,
  documentReference?: RefObject<HTMLDivElement>
  onPreRendering?: () => void
  onPostRendering?: () => void
}

export const BasicMarkdownRenderer: React.FC<BasicMarkdownRendererProps & AdditionalMarkdownRendererProps> = (
  {
    className,
    content,
    wide,
    componentReplacers,
    markdownIt,
    documentReference,
    onPreRendering,
    onPostRendering
  }) => {
  const maxLength = useSelector((state: ApplicationState) => state.config.maxDocumentLength)

  const oldMarkdownLineKeys = useRef<LineKeys[]>()
  const lastUsedLineId = useRef<number>(0)

  const markdownReactDom: ReactElement[] = useMemo(() => {
    if (onPreRendering) {
      onPreRendering()
    }
    const trimmedContent = content.substr(0, maxLength)
    const html: string = markdownIt.render(trimmedContent)
    const contentLines = trimmedContent.split('\n')
    const {
      lines: newLines,
      lastUsedLineId: newLastUsedLineId
    } = calculateNewLineNumberMapping(contentLines, oldMarkdownLineKeys.current ?? [], lastUsedLineId.current)
    oldMarkdownLineKeys.current = newLines
    lastUsedLineId.current = newLastUsedLineId
    const transformer = componentReplacers ? buildTransformer(newLines, componentReplacers()) : undefined
    const rendering = ReactHtmlParser(html, { transform: transformer })
    if (onPostRendering) {
      onPostRendering()
    }
    return rendering
  }, [onPreRendering, onPostRendering, content, maxLength, markdownIt, componentReplacers])

  return (
    <div className={`${className ?? ''} d-flex flex-column align-items-center ${wide ? 'wider' : ''}`}>
      <DocumentLengthLimitReachedAlert contentLength={content.length}/>
      <div ref={documentReference} className={'markdown-body w-100 d-flex flex-column align-items-center'}>
        {markdownReactDom}
      </div>
    </div>
  )
}
