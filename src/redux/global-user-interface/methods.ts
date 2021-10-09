/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { store } from '..'
import { GlobalUserInterfaceConfigActionType, SetDarkModeAction } from './types'

export const setDarkMode = (darkMode: boolean): void => {
  store.dispatch({
    type: GlobalUserInterfaceConfigActionType.SET_DARK_MODE,
    darkMode: darkMode
  } as SetDarkModeAction)
}
