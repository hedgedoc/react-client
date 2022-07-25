/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { ScrollState } from '../../synced-scroll/scroll-props'
import { getGlobalState } from '../../../../redux'
import { useMemo } from 'react'
import type { onScroll } from '../../synced-scroll/scroll-props'

/**
 * Adjusts the given onScroll callback to include the frontmatter line offset.
 *
 * @param onScroll The callback that posts a scroll state
 * @return the modified callback that posts the same scroll state but with line offset
 */
export const useOnScrollWithLineOffset = (onScroll: onScroll | undefined): onScroll | undefined => {
  return useMemo(() => {
    if (onScroll === undefined) {
      return undefined
    } else {
      return (scrollState: ScrollState) => {
        onScroll({
          firstLineInView:
            scrollState.firstLineInView + getGlobalState().noteDetails.frontmatterRendererInfo.lineOffset,
          scrolledPercentage: scrollState.scrolledPercentage
        })
      }
    }
  }, [onScroll])
}
