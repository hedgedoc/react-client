/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Reducer } from 'redux'
import {
  GlobalUserInterfaceConfig,
  GlobalUserInterfaceConfigActions,
  GlobalUserInterfaceConfigActionType
} from './types'

export const initialState: GlobalUserInterfaceConfig = {
  darkMode: false
}

export const GlobalUserInterfaceConfigReducer: Reducer<GlobalUserInterfaceConfig, GlobalUserInterfaceConfigActions> = (
  state: GlobalUserInterfaceConfig = initialState,
  action: GlobalUserInterfaceConfigActions
) => {
  switch (action.type) {
    case GlobalUserInterfaceConfigActionType.SET_DARK_MODE:
      return changeDarkMode(state, action.darkMode)
    default:
      return state
  }
}

const changeDarkMode = (oldState: GlobalUserInterfaceConfig, darkMode: boolean) => {
  return {
    ...oldState,
    darkMode
  }
}
