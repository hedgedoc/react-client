/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useCallback, useEffect, useRef, useState } from 'react'

const isLeftMouseButtonClicked = (mouseEvent: MouseEvent): boolean => {
  return mouseEvent.buttons === 1
}

/**
 * Extracts the absolute horizontal position of the mouse or touch point from the event.
 * If no position could be found or
 *
 * @param moveEvent
 */
const extractPointerPosition = (moveEvent: MouseEvent | TouchEvent): number => {
  if (isMouseEvent(moveEvent)) {
    return moveEvent.pageY
  } else {
    return moveEvent.touches[0]?.pageY
  }
}

/**
 * Checks if the given {@link Event} is a {@link MouseEvent}
 * @param event the event to check
 * @return {@code true} if the given event is a {@link MouseEvent}
 */
const isMouseEvent = (event: Event): event is MouseEvent => {
  return (event as MouseEvent).buttons !== undefined
}

export type PointerEvent = MouseEvent | TouchEvent
export type PointerEventHandler = (event: PointerEvent) => void

/**
 * Provides logic for resizing a {@link GistFrame gist frame} by dragging an element.
 *
 * @param initialFrameHeight The initial size for the frame
 * @return An array containing the current frame height and function to start the resizing
 */
export const useResizeGistFrame = (initialFrameHeight: number): [number, PointerEventHandler] => {
  const [frameHeight, setFrameHeight] = useState(initialFrameHeight)
  const lastYPosition = useRef<number | undefined>(undefined)

  const onMove = useCallback((moveEvent: MouseEvent | TouchEvent) => {
    if (lastYPosition.current === undefined) {
      return
    }
    if (isMouseEvent(moveEvent) && !isLeftMouseButtonClicked(moveEvent)) {
      lastYPosition.current = undefined
      moveEvent.preventDefault()
      return undefined
    }

    const currentPointerPosition = extractPointerPosition(moveEvent)
    const deltaPointerPosition = currentPointerPosition - lastYPosition.current
    lastYPosition.current = currentPointerPosition
    setFrameHeight((oldFrameHeight) => Math.max(0, oldFrameHeight + deltaPointerPosition))
    moveEvent.preventDefault()
  }, [])

  const onStartResizing: PointerEventHandler = useCallback((event) => {
    lastYPosition.current = extractPointerPosition(event)
  }, [])

  const onStopResizing = useCallback(() => {
    if (lastYPosition.current !== undefined) {
      lastYPosition.current = undefined
    }
  }, [])

  useEffect(() => {
    const moveHandler = onMove
    const stopResizeHandler = onStopResizing
    window.addEventListener('touchmove', moveHandler)
    window.addEventListener('mousemove', moveHandler)
    window.addEventListener('touchcancel', stopResizeHandler)
    window.addEventListener('touchend', stopResizeHandler)
    window.addEventListener('mouseup', stopResizeHandler)

    return () => {
      window.removeEventListener('touchmove', moveHandler)
      window.removeEventListener('mousemove', moveHandler)
      window.removeEventListener('touchcancel', stopResizeHandler)
      window.removeEventListener('touchend', stopResizeHandler)
      window.removeEventListener('mouseup', stopResizeHandler)
    }
  }, [onMove, onStopResizing])

  return [frameHeight, onStartResizing]
}
