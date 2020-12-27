/*
 * SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Reducer } from 'redux'
import { NotificationAction, NotificationActionType, NotificationState } from './types'

export const initialState: NotificationState = {
  reloadApp: false,
}

export const NotificationReducer: Reducer<NotificationState, NotificationAction> = (state: NotificationState = initialState, action: NotificationAction) => {
  switch (action.type) {
    case NotificationActionType.RELOAD_APP:
      return { ...state, reloadApp: true }
    default:
      return state
  }
}
