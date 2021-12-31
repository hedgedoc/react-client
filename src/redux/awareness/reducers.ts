/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Reducer } from 'redux'
import type { AwarenessActions, AwarenessState, RemoveAwarenessAction, UpdateAwarenessAction } from './types'
import { AwarenessActionType } from './types'

export const AwarenessReducer: Reducer<AwarenessState, AwarenessActions> = (
  state: AwarenessState = {},
  action: AwarenessActions
) => {
  switch (action.type) {
    case AwarenessActionType.REMOVE:
      return buildStateWithRemovedAwareness(state, action)
    case AwarenessActionType.UPDATE:
      return buildStateWithUpdatedAwareness(state, action)
    default:
      return state
  }
}

const buildStateWithRemovedAwareness = (oldState: AwarenessState, action: RemoveAwarenessAction): AwarenessState => {
  return Object.entries(oldState).reduce((newState, [clientId, status]) => {
    if (clientId !== action.clientId) {
      newState[clientId] = status
    }
    return newState
  }, {} as AwarenessState)
}

const buildStateWithUpdatedAwareness = (oldState: AwarenessState, action: UpdateAwarenessAction): AwarenessState => {
  return {
    ...oldState,
    [action.clientId]: {
      cursorFrom: action.cursorFrom < action.cursorTo ? action.cursorFrom : action.cursorTo,
      cursorTo: action.cursorFrom > action.cursorTo ? action.cursorFrom : action.cursorTo,
      lastAction: action.lastAction
    }
  }
}
