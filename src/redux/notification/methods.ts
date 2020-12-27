/*
 * SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { store } from '..'
import { NotificationAction, NotificationActionType } from './types'

export const showReloadAppNotification = (): void => {
  const action: NotificationAction = {
    type: NotificationActionType.RELOAD_APP
  }
  store.dispatch(action)
}
