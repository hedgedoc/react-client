/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type React from 'react'
import { useCallback, useEffect, useRef } from 'react'

export const useExtractFirstHeadline = (
  documentElement: React.RefObject<HTMLDivElement>,
  content: string | undefined,
  onFirstHeadingChange?: (firstHeading: string | undefined) => void
): void => {
  const extractInnerText = useCallback((node: ChildNode | null): string => {
    if (!node) {
      return ''
    }

    if ((node as HTMLElement).classList?.contains('katex-mathml')) {
      return ''
    }

    let innerText = ''

    if (node.childNodes && node.childNodes.length > 0) {
      node.childNodes.forEach((child) => {
        innerText += extractInnerText(child)
      })
    } else if (node.nodeName === 'IMG') {
      innerText += (node as HTMLImageElement).getAttribute('alt')
    } else {
      innerText += node.textContent
    }
    return innerText
  }, [])

  const lastFirstHeading = useRef<string | undefined>()

  useEffect(() => {
    if (onFirstHeadingChange && documentElement.current) {
      const firstHeading = documentElement.current.getElementsByTagName('h1').item(0)
      const headingText = extractInnerText(firstHeading).trim()
      if (headingText !== lastFirstHeading.current) {
        lastFirstHeading.current = headingText
        onFirstHeadingChange(headingText)
      }
    }
  }, [documentElement, extractInnerText, onFirstHeadingChange, content])
}
