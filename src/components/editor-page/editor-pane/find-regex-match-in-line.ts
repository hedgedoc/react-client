/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/**
 * Matches a regex against a given line and returns the n-th match of the regex.
 *
 * @param line The line that should be searched through
 * @param regex The regex that should find matches in the line
 * @param wantedOccurrenceIndex The index of the occurrence to find
 * @return The regex match of the found occurrence or undefined if no match could be found
 */
export const findRegexMatchInLine = (
  line: string,
  regex: RegExp,
  wantedOccurrenceIndex: number
): RegExpMatchArray | undefined => {
  if (wantedOccurrenceIndex < 0) {
    return
  }
  let currentIndex = 0
  for (const match of line.matchAll(regex)) {
    if (currentIndex === wantedOccurrenceIndex) {
      return match
    }
    currentIndex += 1
  }
}
