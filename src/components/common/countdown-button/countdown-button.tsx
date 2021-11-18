/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { ButtonProps } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

export interface CountdownButtonProps extends ButtonProps {
  countdownSeconds: number
}

/**
 * Button that starts a countdown on render and is only clickable after the countdown has finished.
 */
export const CountdownButton: React.FC<CountdownButtonProps> = ({ countdownSeconds, children, ...props }) => {
  const intervalRef = useRef<NodeJS.Timeout>()
  const [secondsRemaining, setSecondsRemaining] = useState(countdownSeconds)

  const onTimerTick = useCallback(() => {
    setSecondsRemaining((previous) => previous - 1)
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(onTimerTick, 1000)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [onTimerTick])

  return (
    <Button disabled={secondsRemaining > 0} {...props}>
      {secondsRemaining > 0 ? secondsRemaining : children}
    </Button>
  )
}
