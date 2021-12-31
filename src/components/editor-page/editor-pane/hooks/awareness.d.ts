/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export interface AwarenessUpdate {
  added: number[]
  removed: number[]
  updated: number[]
}

export interface AwarenessState {
  cursor: null | {
    anchor: string
    head: string
  }
}
