/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { LineMarkerPosition } from '../../markdown-renderer/markdown-extension/linemarker/types'

/**
 * Finds the surrounding {@link LineMarkerPosition line markers} from a list of line markers and the current line.
 *
 * @param lineMarks The list of line markers
 * @param lineNumber The current line
 * @return An object containing the last line mark before the current line and the next line mark after the current line
 * if applicable and undefined for each field otherwise
 */
export const findLineMarks = (
  lineMarks: LineMarkerPosition[],
  lineNumber: number
): { lastMarkBefore: LineMarkerPosition | undefined; firstMarkAfter: LineMarkerPosition | undefined } => {
  let lastMarkBefore
  let firstMarkAfter
  for (let i = 0; i < lineMarks.length; i++) {
    const currentMark = lineMarks[i]
    if (!currentMark) {
      continue
    }

    if (currentMark.line <= lineNumber) {
      lastMarkBefore = currentMark
    }
    if (currentMark.line > lineNumber) {
      firstMarkAfter = currentMark
    }
    if (!!firstMarkAfter && !!lastMarkBefore) {
      break
    }
  }
  return {
    lastMarkBefore,
    firstMarkAfter
  }
}
