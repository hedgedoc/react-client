/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { store } from '..'
import { DarkModeConfig, DarkModeConfigActionType, SetDarkModeConfigAction } from './types'
import { Logger } from '../../utils/logger'

const log = new Logger('dark mode')

export const setDarkMode = (darkMode: boolean): void => {
  store.dispatch({
    type: DarkModeConfigActionType.SET_DARK_MODE,
    darkMode: darkMode
  } as SetDarkModeConfigAction)
}

export const saveToLocalStorage = (darkModeConfig: DarkModeConfig): void => {
  try {
    window.localStorage.setItem('nightMode', String(darkModeConfig.darkMode))
  } catch (e) {
    log.error('Saving to local storage failed: ', e)
  }
}

export const loadFromLocalStorage = (): DarkModeConfig | undefined => {
  try {
    const storedValue = window.localStorage.getItem('nightMode')
    if (!storedValue) {
      return undefined
    }
    return {
      darkMode: storedValue === 'true'
    }
  } catch (e) {
    log.error('Loading from local storage failed: ', e)
    return undefined
  }
}

export const determineDarkModeBrowserSetting = (): DarkModeConfig | undefined => {
  try {
    const mediaQueryResult = window.matchMedia('(prefers-color-scheme: dark)').matches
    return {
      darkMode: mediaQueryResult
    }
  } catch (e) {
    log.error('Can not determine setting from browser: ', e)
    return undefined
  }
}
