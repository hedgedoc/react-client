/*
 * SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Action } from 'redux'
import { ConnectionState } from '../../components/editor/document-bar/connection-indicator/connection-state'

export enum ConnectionActionsType {
  SET_CONNECTION_STATE = 'connection/state/set',
  SET_CONNECTION_CLIENTS = 'connection/clients/set'
}

export interface Connection {
  state: ConnectionState,
  clients: Map<number, {[p: string]: any}>
}

export interface ConnectionActions extends Action<ConnectionActionsType> {
  type: ConnectionActionsType
}

export interface SetConnectionStateAction extends ConnectionActions {
  state: ConnectionState
}

export interface SetConnectionClientsAction extends ConnectionActions {
  clients: Map<number, {[p: string]: any}>
}
