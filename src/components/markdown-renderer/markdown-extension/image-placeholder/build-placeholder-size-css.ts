/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { CSSProperties } from 'react'
import { useMemo } from 'react'

const regex = /^([0-9]{1-4})px$/

/**
 * Inspects the given value and checks if it is a number or a pixel size string.
 *
 * @param value The value to check
 * @return the number representation of the string or undefined if it couldn't be parsed
 */
export const parseSizeNumber = (value: string | number | undefined): number | undefined => {
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

/**
 * Calculates the final width and height for a placeholder container.
 * Every parameter that is empty will be defaulted using a 500:200 ratio.
 *
 * @param width The wanted width
 * @param height The wanted height
 * @return the calculated size
 */
export const calculatePlaceholderContainerSize = (
  width: string | number | undefined,
  height: string | number | undefined
): [width: number, height: number] => {
  const defaultWidth = 500
  const defaultHeight = 200
  const ratio = defaultWidth / defaultHeight

  const convertedWidth = parseSizeNumber(width)
  const convertedHeight = parseSizeNumber(height)

  if (convertedWidth === undefined && convertedHeight !== undefined) {
    return [convertedHeight * ratio, convertedHeight]
  } else if (convertedWidth !== undefined && convertedHeight === undefined) {
    return [convertedWidth, convertedWidth * (1 / ratio)]
  } else if (convertedWidth !== undefined && convertedHeight !== undefined) {
    return [convertedWidth, convertedHeight]
  } else {
    return [defaultWidth, defaultHeight]
  }
}

/**
 * Creates the style attribute for a placeholder container with width and height.
 *
 * @param width The wanted width
 * @param height The wanted height
 * @return The created style attributes
 */
export const usePlaceholderSizeStyle = (width?: string | number, height?: string | number): CSSProperties => {
  return useMemo(() => {
    const [convertedWidth, convertedHeight] = calculatePlaceholderContainerSize(width, height)

    return {
      width: `${convertedWidth}px`,
      height: `${convertedHeight}px`
    }
  }, [height, width])
}