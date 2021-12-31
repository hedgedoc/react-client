/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Action } from 'redux'

export enum AwarenessActionType {
  UPDATE = 'awareness/update',
  REMOVE = 'awareness/remove'
}

export type AwarenessActions = UpdateAwarenessAction | RemoveAwarenessAction

export interface UpdateAwarenessAction extends Action<AwarenessActionType> {
  type: AwarenessActionType.UPDATE
  clientId: string
  cursorFrom: number
  cursorTo: number
  lastAction: number
}

export interface RemoveAwarenessAction extends Action<AwarenessActionType> {
  type: AwarenessActionType.REMOVE
  clientId: string
}

export interface ClientAwarenessStatus {
  cursorFrom: number
  cursorTo: number
  lastAction: number
}

export type AwarenessState = Record<string, ClientAwarenessStatus>
