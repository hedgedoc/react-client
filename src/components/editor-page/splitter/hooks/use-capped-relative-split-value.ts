/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useMemo } from 'react'

/**
 * Limits the given relative split value to a range from 0 to 100.
 *
 * @param showLeft Defines if the left split pane should be shown
 * @param showRight Defines if the right split pane should be shown
 * @param relativeSplitValue The relative size ratio of the split
 * @return the given limited relative split value. If only the left or right pane should be shown then the return value will be 100 or 0
 */
export const useCappedRelativeSplitValue = (
  showLeft: boolean,
  showRight: boolean,
  relativeSplitValue: number
): number =>
  useMemo(() => {
    let splitValue: number
    if (!showLeft && showRight) {
      splitValue = 0
    } else if (showLeft && !showRight) {
      splitValue = 100
    } else {
      splitValue = relativeSplitValue
    }

    return Math.min(100, Math.max(0, splitValue))
  }, [relativeSplitValue, showLeft, showRight])
