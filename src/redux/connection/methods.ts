/*
 * SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { store } from '..'
import { ConnectionState } from '../../components/editor/document-bar/connection-indicator/connection-state'
import { ConnectionActionsType, SetConnectionClientsAction, SetConnectionStateAction } from './types'

export const setConnectionState = (state: ConnectionState): void => {
  const action: SetConnectionStateAction = {
    type: ConnectionActionsType.SET_CONNECTION_STATE,
    state
  }
  store.dispatch(action)
}

export const setConnectionClients = (clients: Map<number, {[p: string]: any}>): void => {
  const action: SetConnectionClientsAction = {
    type: ConnectionActionsType.SET_CONNECTION_CLIENTS,
    clients
  }
  store.dispatch(action)
}
