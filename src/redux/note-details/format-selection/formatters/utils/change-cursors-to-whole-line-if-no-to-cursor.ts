/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { CursorSelection } from '../../../../editor/types'

/**
 * If the given cursor selection has no to position then the selection will be changed to cover the whole line of the from cursor.
 *
 * @param markdownContent The markdown content that is used to calculate the start and end position of the line
 * @param selection The selection that is in the line whose start and end index should be calculated
 * @return The corrected selection if no to cursor is present or the unmodified selection otherwise
 * @throws Error if the line, that the from cursor is referring to, doesn't exist.
 */
export const changeCursorsToWholeLineIfNoToCursor = (
  markdownContent: string,
  selection: CursorSelection
): CursorSelection => {
  if (selection.to !== undefined) {
    return selection
  }

  const newFrom = searchForStartOfLine(markdownContent, selection.from)
  const newTo = searchForEndOfLine(markdownContent, selection.from)

  return {
    from: newFrom,
    to: newTo
  }
}

export const searchForStartOfLine = (content: string, startPosition: number): number => {
  const adjustedStartPosition = Math.min(Math.max(0, startPosition), content.length)

  for (let characterIndex = adjustedStartPosition; characterIndex > 0; characterIndex -= 1) {
    if (content.slice(characterIndex - 1, characterIndex) === '\n') {
      return characterIndex
    }
  }
  return 0
}

export const searchForEndOfLine = (content: string, startPosition: number): number => {
  const adjustedStartPosition = Math.min(Math.max(0, startPosition), content.length)

  for (let characterIndex = adjustedStartPosition; characterIndex < content.length; characterIndex += 1) {
    if (content.slice(characterIndex, characterIndex + 1) === '\n') {
      return characterIndex
    }
  }
  return content.length
}

export const searchForNewline = (haystack: string, startPosition: number, step: number): number | undefined => {
  const adjustedStartPosition = Math.min(Math.max(0, startPosition), haystack.length)
  for (
    let characterIndex = adjustedStartPosition;
    characterIndex > 0 && characterIndex < haystack.length;
    characterIndex += step
  ) {
    if (haystack.slice(characterIndex, characterIndex + step) === '\n') {
      return characterIndex
    }
  }
}
