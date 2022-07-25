/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useApplicationState } from '../../../../hooks/common/use-application-state'
import type { ScrollState } from '../../synced-scroll/scroll-props'
import { useMemo } from 'react'
import { Optional } from '@mrdrogdrog/optional'

/**
 * Adjusts the given {@link ScrollState scroll state} to exclude the frontmatter line offset.
 *
 * @param scrollState The original scroll state with the line offset
 * @return the adjusted scroll state without the line offset
 */
export const useScrollStateWithoutLineOffset = (scrollState: ScrollState | undefined): ScrollState | undefined => {
  const lineOffset = useApplicationState((state) => state.noteDetails.frontmatterRendererInfo.lineOffset)
  return useMemo(() => {
    return scrollState === undefined
      ? undefined
      : {
          firstLineInView: scrollState.firstLineInView - lineOffset,
          scrolledPercentage: scrollState.scrolledPercentage
        }
  }, [lineOffset, scrollState])
}
