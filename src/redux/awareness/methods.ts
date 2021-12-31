/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { store } from '../index'
import type { RemoveAwarenessAction, UpdateAwarenessAction } from './types'
import { AwarenessActionType } from './types'

export const updateAwareness = (clientId: string, cursorFrom: number, cursorTo: number): void => {
  store.dispatch({
    type: AwarenessActionType.UPDATE,
    lastAction: new Date().getTime(),
    clientId: clientId,
    cursorFrom,
    cursorTo
  } as UpdateAwarenessAction)
}

export const removeAwareness = (clientId: string): void => {
  store.dispatch({
    type: AwarenessActionType.REMOVE,
    clientId: clientId
  } as RemoveAwarenessAction)
}
