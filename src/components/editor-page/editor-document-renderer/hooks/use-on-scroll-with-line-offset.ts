/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useMemo } from 'react'
import type { ScrollState } from '../../synced-scroll/scroll-props'
import { useApplicationState } from '../../../../hooks/common/use-application-state'

export const useOnScrollWithLineOffset = (
  onScroll: ((scrollState: ScrollState) => void) | undefined
) => {
  const lineOffset = useApplicationState((state) => state.noteDetails.frontmatterRendererInfo.lineOffset)

  return useMemo(() => {
    if (onScroll === undefined) {
      return
    }
    return (newScrollState: ScrollState) => {
      onScroll({
        firstLineInView: newScrollState.firstLineInView + lineOffset,
        scrolledPercentage: newScrollState.scrolledPercentage
      })
    }
  }, [lineOffset, onScroll])
}
