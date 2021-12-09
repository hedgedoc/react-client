/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { CSSProperties } from 'react'
import { useMemo } from 'react'
import { calculatePlaceholderContainerSize } from '../utils/build-placeholder-size-css'

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
