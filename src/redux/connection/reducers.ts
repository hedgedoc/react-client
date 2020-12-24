/*
 * SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Reducer } from 'redux'
import { ConnectionState } from '../../components/editor/document-bar/connection-indicator/connection-state'
import {
  Connection,
  ConnectionActions,
  ConnectionActionsType,
  SetConnectionClientsAction,
  SetConnectionStateAction
} from './types'

export const getInitialState = (): Connection => {
  return {
    state: ConnectionState.UNKNOWN,
    clients: new Map<number, {[p: string]: any}>()
  }
}

export const ConnectionReducer: Reducer<Connection, ConnectionActions> = (reduxState: Connection = getInitialState(), action: ConnectionActions) => {
  switch (action.type) {
    case ConnectionActionsType.SET_CONNECTION_STATE:
      return {
        ...reduxState,
        state: (action as SetConnectionStateAction).state
      }
    case ConnectionActionsType.SET_CONNECTION_CLIENTS:
      return {
        ...reduxState,
        clients: (action as SetConnectionClientsAction).clients
      }
    default:
      return reduxState
  }
}
