/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { ReactElement } from 'react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ShowIf } from '../../common/show-if/show-if'
import { SplitDivider } from './split-divider/split-divider'
import './splitter.scss'
import { useAdjustedRelativeSplitValue } from './hooks/use-adjusted-relative-split-value'

export interface SplitterProps {
  left: ReactElement
  right: ReactElement
  additionalContainerClassName?: string
  showLeft: boolean
  showRight: boolean
}

/**
 * Checks if the given {@link Event} is a {@link MouseEvent}
 * @param event the event to check
 * @return {@code true} if the given event is a {@link MouseEvent}
 */
const isMouseEvent = (event: Event): event is MouseEvent => {
  return (event as MouseEvent).buttons !== undefined
}

const isLeftMouseButtonClicked = (mouseEvent: MouseEvent): boolean => {
  return mouseEvent.buttons === 1
}

/**
 * Extracts the absolute horizontal position of the mouse or touch point from the event.
 * If no position could be found or
 *
 * @param moveEvent
 */
const extractHorizontalPosition = (moveEvent: MouseEvent | TouchEvent): number => {
  if (isMouseEvent(moveEvent)) {
    return moveEvent.pageX
  } else {
    return moveEvent.touches[0]?.pageX
  }
}

/**
 * Creates a Left/Right splitter react component.
 *
 * @param additionalContainerClassName css classes that are added to the split container.
 * @param left the react component that should be shown on the left side.
 * @param right the react component that should be shown on the right side.
 * @param showLeft defines if the left component should be shown or hidden. Settings this prop will hide the component with css.
 * @param showRight defines if the right component should be shown or hidden. Settings this prop will hide the component with css.
 * @return the created component
 */
export const Splitter: React.FC<SplitterProps> = ({
  additionalContainerClassName,
  left,
  right,
  showLeft,
  showRight
}) => {
  const [relativeSplitValue, setRelativeSplitValue] = useState(50)
  const adjustedRelativeSplitValue = useAdjustedRelativeSplitValue(showLeft, showRight, relativeSplitValue)
  const resizingInProgress = useRef(false)
  const splitContainer = useRef<HTMLDivElement>(null)

  /**
   * Starts the splitter resizing
   */
  const onStartResizing = useCallback(() => {
    resizingInProgress.current = true
  }, [])

  /**
   * Stops the splitter resizing
   */
  const onStopResizing = useCallback(() => {
    if (resizingInProgress.current) {
      resizingInProgress.current = false
    }
  }, [])

  /**
   * Recalculates the panel split based on the absolute mouse/touch position.
   *
   * @param moveEvent is a {@link MouseEvent} or {@link TouchEvent} that got triggered.
   */
  const onMove = useCallback((moveEvent: MouseEvent | TouchEvent) => {
    if (!resizingInProgress.current || !splitContainer.current) {
      return
    }
    if (isMouseEvent(moveEvent) && !isLeftMouseButtonClicked(moveEvent)) {
      resizingInProgress.current = false
      moveEvent.preventDefault()
      return undefined
    }

    const horizontalPosition = extractHorizontalPosition(moveEvent)
    const horizontalPositionInSplitContainer = horizontalPosition - splitContainer.current.offsetLeft
    const newRelativeSize = horizontalPositionInSplitContainer / splitContainer.current.clientWidth
    setRelativeSplitValue(newRelativeSize * 100)
    moveEvent.preventDefault()
  }, [])

  /**
   * Registers and unregisters necessary event listeners on the body so you can use the split even if the mouse isn't moving over it.
   */
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
  }, [resizingInProgress, onMove, onStopResizing])

  return (
    <div ref={splitContainer} className={`flex-fill flex-row d-flex ${additionalContainerClassName || ''}`}>
      <div
        className={`splitter left ${!showLeft ? 'd-none' : ''}`}
        style={{ width: `calc(${adjustedRelativeSplitValue}% - 5px)` }}>
        {left}
      </div>
      <ShowIf condition={showLeft && showRight}>
        <div className='splitter separator'>
          <SplitDivider onGrab={onStartResizing} />
        </div>
      </ShowIf>
      <div
        className={`splitter right ${!showRight ? 'd-none' : ''}`}
        style={{ width: `calc(100% - ${adjustedRelativeSplitValue}%)` }}>
        {right}
      </div>
    </div>
  )
}
