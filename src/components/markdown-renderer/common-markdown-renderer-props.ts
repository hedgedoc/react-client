/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { TocAst } from 'markdown-it-toc-done-right'
import type { Ref } from 'react'

export interface CommonMarkdownRendererProps {
  onFirstHeadingChange?: (firstHeading: string | undefined) => void
  onTocChange?: (ast?: TocAst) => void
  baseUrl: string
  outerContainerRef?: Ref<HTMLDivElement>
  newlinesAreBreaks?: boolean
  className?: string
  markdownContentLines: string[]
}
