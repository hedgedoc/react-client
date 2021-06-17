/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import MarkdownIt from 'markdown-it/lib'
import { useMemo, useRef } from 'react'
import { ComponentReplacer, ValidReactDomElement } from '../replace-components/ComponentReplacer'
import { LineKeys } from '../types'
import { buildTransformer } from '../utils/html-react-transformer'
import { calculateNewLineNumberMapping } from '../utils/line-number-mapping'
import convertHtmlToReact from '@hedgedoc/html-to-react'

export const useConvertMarkdownToReactDom = (
  markdownCode: string,
  markdownIt: MarkdownIt,
  replacers: ComponentReplacer[],
  onBeforeRendering?: () => void,
  onAfterRendering?: () => void
): ValidReactDomElement[] => {
  const oldMarkdownLineKeys = useRef<LineKeys[]>()
  const lastUsedLineId = useRef<number>(0)

  return useMemo(() => {
    if (onBeforeRendering) {
      onBeforeRendering()
    }
    const html = markdownIt.render(markdownCode)
    const contentLines = markdownCode.split('\n')
    const { lines: newLines, lastUsedLineId: newLastUsedLineId } = calculateNewLineNumberMapping(
      contentLines,
      oldMarkdownLineKeys.current ?? [],
      lastUsedLineId.current
    )
    oldMarkdownLineKeys.current = newLines
    lastUsedLineId.current = newLastUsedLineId

    const transformer = replacers.length > 0 ? buildTransformer(newLines, replacers) : undefined
    const rendering = convertHtmlToReact(html, { transform: transformer })
    if (onAfterRendering) {
      onAfterRendering()
    }
    return rendering
  }, [onBeforeRendering, markdownIt, markdownCode, replacers, onAfterRendering])
}
