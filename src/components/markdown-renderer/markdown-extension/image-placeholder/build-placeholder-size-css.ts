/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type React from 'react'

const regex = /^([0-9]{1-4})px$/

export const convertToNumber = (value: string | number | undefined): number | undefined => {
  if (value === undefined) {
    return undefined
  }

  if (typeof value === 'number') {
    return value
  }

  if (regex.test(value)) {
    const regexMatches = regex.exec(value)
    if (regexMatches && regexMatches.length === 1) {
      return parseInt(regexMatches[0])
    } else {
      return undefined
    }
  }

  if (!Number.isNaN(value)) {
    return parseInt(value)
  }
}

export const buildPlaceholderSizeCss = (
  width: string | number | undefined,
  height: string | number | undefined
): React.CSSProperties => {
  const defaultWidth = 500
  const defaultHeight = 200
  const ratio = defaultWidth / defaultHeight

  let convertedWidth = convertToNumber(width)
  let convertedHeight = convertToNumber(height)

  if (!convertedWidth && convertedHeight) {
    // only height set
    convertedWidth = convertedHeight * ratio
  } else if (convertedWidth && !convertedHeight) {
    // only width set
    convertedHeight = convertedWidth * (1 / ratio)
  }

  return {
    width: `${convertedWidth ?? defaultWidth}px`,
    height: `${convertedHeight ?? defaultHeight}px`
  }
}
