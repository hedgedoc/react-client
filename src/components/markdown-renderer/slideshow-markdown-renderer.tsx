/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Ref, useCallback, useMemo, useRef, useState } from 'react'
import { useConvertMarkdownToReactDom } from './hooks/use-convert-markdown-to-react-dom'
import './markdown-renderer.scss'
import { ComponentReplacer } from './replace-components/ComponentReplacer'
import { AdditionalMarkdownRendererProps } from './types'
import { useComponentReplacers } from './hooks/use-component-replacers'
import { NoteFrontmatter, RawNoteFrontmatter } from '../editor-page/note-frontmatter/note-frontmatter'
import { useExtractFirstHeadline } from './hooks/use-extract-first-headline'
import { TocAst } from 'markdown-it-toc-done-right'
import { useOnRefChange } from './hooks/use-on-ref-change'
import { BasicMarkdownItConfigurator } from './markdown-it-configurator/BasicMarkdownItConfigurator'
import { ImageClickHandler } from './replace-components/image/image-replacer'
import { useTrimmedContent } from './hooks/use-trimmed-content'
import { useOnFrontmatterChange } from './hooks/use-on-frontmatter-change'
import { useReveal } from './hooks/use-reveal'
import './slideshow.scss'

export interface BasicMarkdownRendererProps {
  additionalReplacers?: () => ComponentReplacer[],
  onBeforeRendering?: () => void
  onAfterRendering?: () => void
  onFirstHeadingChange?: (firstHeading: string | undefined) => void
  onFrontmatterChange?: (frontmatter: NoteFrontmatter | undefined) => void
  onTaskCheckedChange?: (lineInMarkdown: number, checked: boolean) => void
  onTocChange?: (ast?: TocAst) => void
  baseUrl?: string
  onImageClick?: ImageClickHandler
  outerContainerRef?: Ref<HTMLDivElement>
  useAlternativeBreaks?: boolean
}

export const SlideshowMarkdownRenderer: React.FC<BasicMarkdownRendererProps & AdditionalMarkdownRendererProps> = (
  {
    className,
    markdownContent,
    additionalReplacers,
    onBeforeRendering,
    onAfterRendering,
    onFirstHeadingChange,
    onFrontmatterChange,
    onTaskCheckedChange,
    onTocChange,
    baseUrl,
    onImageClick,
    outerContainerRef,
    useAlternativeBreaks
  }) => {
  const rawMetaRef = useRef<RawNoteFrontmatter>()
  const markdownBodyRef = useRef<HTMLDivElement>(null)
  const hasNewYamlError = useRef(false)
  const tocAst = useRef<TocAst>()
  const [showYamlError, setShowYamlError] = useState(false)
  const { trimmedContent, contentExceedsLimit } = useTrimmedContent(markdownContent)

  const markdownIt = useMemo(() =>
    new BasicMarkdownItConfigurator({
      useFrontmatter: !!onFrontmatterChange,
      onParseError: errorState => hasNewYamlError.current = errorState,
      onRawMetaChange: rawMeta => rawMetaRef.current = rawMeta,
      onToc: toc => tocAst.current = toc,
      useAlternativeBreaks
    }).buildConfiguredMarkdownIt(), [onFrontmatterChange, useAlternativeBreaks])

  const clearFrontmatter = useCallback(() => {
    hasNewYamlError.current = false
    rawMetaRef.current = undefined
    onBeforeRendering?.()
  }, [onBeforeRendering])

  const checkYamlErrorState = useCallback(() => {
    setShowYamlError(hasNewYamlError.current)
    onAfterRendering?.()
  }, [onAfterRendering])

  const baseReplacers = useComponentReplacers(onTaskCheckedChange, onImageClick, baseUrl)
  const markdownReactDom = useConvertMarkdownToReactDom(trimmedContent, markdownIt, baseReplacers, additionalReplacers, clearFrontmatter, checkYamlErrorState)

  useExtractFirstHeadline(markdownBodyRef, markdownContent, onFirstHeadingChange)
  useOnRefChange(tocAst, onTocChange)
  useOnFrontmatterChange(rawMetaRef, onFrontmatterChange)
  useReveal(markdownContent)

  return (
    <div className={ 'reveal' }>
      <div ref={ markdownBodyRef } className={ `${ className ?? '' } slides` }>
        { markdownReactDom }
      </div>
    </div>
  )
}

export default SlideshowMarkdownRenderer
