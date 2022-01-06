/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import type { SlideshowMarkdownRendererProps } from '../markdown-renderer/slideshow-markdown-renderer'
import { SlideshowMarkdownRenderer } from '../markdown-renderer/slideshow-markdown-renderer'
import type { ScrollProps } from '../editor-page/synced-scroll/scroll-props'

export const MarkdownSlideshow: React.FC<SlideshowMarkdownRendererProps & ScrollProps> = ({
  markdownContentLines,
  baseUrl,
  onFirstHeadingChange,
  slideOptions
}) => {
  return (
    <SlideshowMarkdownRenderer
      markdownContentLines={markdownContentLines}
      baseUrl={baseUrl}
      onFirstHeadingChange={onFirstHeadingChange}
      slideOptions={slideOptions}
    />
  )
}
