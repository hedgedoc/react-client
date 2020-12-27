/*
 * SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Action } from 'redux'

export enum NotificationActionType {
  RELOAD_APP = 'notification/reload-app',
}

export interface NotificationAction extends Action<NotificationActionType> {
  type: NotificationActionType;
}

export interface NotificationState {
  reloadApp: boolean
}
