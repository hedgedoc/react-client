/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useMemo } from 'react'
import type { ScrollState } from '../../synced-scroll/scroll-props'
import { useApplicationState } from '../../../../hooks/common/use-application-state'

export const useScrollStateWithoutLineOffset = (scrollState: ScrollState|undefined): ScrollState|undefined => {
  const lineOffset = useApplicationState((state) => state.noteDetails.frontmatterRendererInfo.lineOffset)

  return useMemo(() => {
    if (scrollState === undefined) {
      return
    }
    return {
      firstLineInView: scrollState.firstLineInView - lineOffset,
      scrolledPercentage: scrollState?.scrolledPercentage
    }
  }, [lineOffset, scrollState])
}
