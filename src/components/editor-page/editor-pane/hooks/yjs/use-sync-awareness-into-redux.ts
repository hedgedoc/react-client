/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect } from 'react'
import type { AwarenessState, AwarenessUpdate } from '../awareness'
import type { RelativePosition } from 'yjs'
import { createAbsolutePositionFromRelativePosition } from 'yjs'
import { removeAwareness, updateAwareness } from '../../../../../redux/awareness/methods'
import type { WebsocketProvider } from 'y-websocket'
import { Logger } from '../../../../../utils/logger'

const logger = new Logger('Sync awareness into redux')

export const useSyncAwarenessIntoRedux = (websocketProvider: WebsocketProvider): void => {
  useEffect(() => {
    const processAwarenessUpdate = (clientId: number): void => {
      const state = websocketProvider.awareness.states.get(clientId) as AwarenessState
      if (state === undefined || state.cursor === null || state.cursor.head === null || state.cursor.anchor === null) {
        logger.debug(clientId, 'lost focus')
      } else {
        const headPosition = JSON.parse(state.cursor.head) as RelativePosition
        const anchorPosition = JSON.parse(state.cursor.anchor) as RelativePosition
        const head = createAbsolutePositionFromRelativePosition(headPosition, websocketProvider.doc)
        const anchor = createAbsolutePositionFromRelativePosition(anchorPosition, websocketProvider.doc)
        if (head === null || anchor === null) {
          return
        }
        logger.debug(clientId, 'position', head?.index, anchor?.index)
        updateAwareness(clientId.toString(), head.index, anchor.index)
      }
    }
    const processAwarenessEvent = (eventData: AwarenessUpdate) => {
      eventData.added.forEach((clientId) => processAwarenessUpdate(clientId))
      eventData.updated.forEach((clientId) => processAwarenessUpdate(clientId))
      eventData.removed.forEach((clientId) => removeAwareness(clientId.toString()))
    }
    websocketProvider.awareness.on('change', processAwarenessEvent)
    return () => {
      websocketProvider.awareness.off('change', processAwarenessEvent)
    }
  }, [websocketProvider])
}
