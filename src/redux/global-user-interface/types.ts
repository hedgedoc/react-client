/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Action } from 'redux'

export enum GlobalUserInterfaceConfigActionType {
  SET_DARK_MODE = 'global-user-interface-config/dark-mode/set'
}

export interface GlobalUserInterfaceConfig {
  darkMode: boolean
}

export type GlobalUserInterfaceConfigActions = SetDarkModeAction

export interface SetDarkModeAction extends Action<GlobalUserInterfaceConfigActionType> {
  type: GlobalUserInterfaceConfigActionType.SET_DARK_MODE
  darkMode: boolean
}
