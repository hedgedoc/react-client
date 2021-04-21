/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect, useRef } from 'react'
import Reveal from 'reveal.js'

export const useReveal = (content: string): void => {
  const deck = useRef<Reveal>()

  useEffect(() => {
    if (!deck.current) {
      deck.current = new Reveal({})
      deck.current.initialize()
    } else {
      deck.current.sync()
    }
  }, [content])
}
