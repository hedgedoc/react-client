/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import { ShowIf } from '../../common/show-if/show-if'
import { SplitDivider } from './split-divider/split-divider'
import './splitter.scss'

export interface SplitterProps {
  left: ReactElement
  right: ReactElement
  containerClassName?: string
  showLeft: boolean
  showRight: boolean
}

const isMouseEvent = (event: MouseEvent | TouchEvent): event is MouseEvent => {
  return (event as MouseEvent).buttons !== undefined
}

export const Splitter: React.FC<SplitterProps> = ({ containerClassName, left, right, showLeft, showRight }) => {
  const [split, setSplit] = useState(50)
  const realSplit = Math.max(0, Math.min(100, showRight ? split : 100))
  const doResizing = useRef(false)
  const splitContainer = useRef<HTMLDivElement>(null)

  const onGrab = useCallback(() => {
    doResizing.current = true
  }, [])

  const onStopResizing = useCallback(() => {
    if (doResizing.current) {
      doResizing.current = false
    }
  }, [])

  const onMove = useCallback((moveEvent: MouseEvent | TouchEvent) => {
    if (!doResizing.current || !splitContainer.current) {
      return
    }
    let pageX
    if (isMouseEvent(moveEvent)) {
      if (moveEvent.buttons !== 1) {
        doResizing.current = false
        moveEvent.preventDefault()
        return
      }
      pageX = moveEvent.pageX
    } else {
      pageX = moveEvent.touches[0].pageX
    }
    const x = pageX - splitContainer.current.offsetLeft
    const newSize = x / splitContainer.current.clientWidth
    setSplit(newSize * 100)
    moveEvent.preventDefault()
  }, [])

  useEffect(() => {
    const moveHandler = onMove
    const stopResizeHandler = onStopResizing
    document.body.addEventListener('touchmove', moveHandler)
    document.body.addEventListener('mousemove', moveHandler)
    document.body.addEventListener('touchcancel', stopResizeHandler)
    document.body.addEventListener('touchend', stopResizeHandler)
    document.body.addEventListener('mouseup', stopResizeHandler)

    return () => {
      document.body.removeEventListener('touchmove', moveHandler)
      document.body.removeEventListener('mousemove', moveHandler)
      document.body.removeEventListener('touchcancel', stopResizeHandler)
      document.body.removeEventListener('touchend', stopResizeHandler)
      document.body.removeEventListener('mouseup', stopResizeHandler)
    }
  }, [doResizing, onMove, onStopResizing])

  return (
    <div
      ref={ splitContainer }
      className={ `flex-fill flex-row d-flex ${ containerClassName || '' }` }>
      <div className={ `splitter left ${ !showLeft ? 'd-none' : '' }` }
           style={ { width: `calc(${ realSplit }% - 5px)` } }>
        { left }
      </div>
      <ShowIf condition={ showLeft && showRight }>
        <div className="splitter separator">
          <SplitDivider onGrab={ onGrab }/>
        </div>
      </ShowIf>
      <div className={ `splitter right ${ !showRight ? 'd-none' : '' }` }
           style={ { width: `calc(100% - ${ realSplit }%)` } }>{ right }</div>
    </div>
  )
}
