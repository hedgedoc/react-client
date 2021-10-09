/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { setDarkMode } from '../../../redux/global-user-interface/methods'
import { Logger } from '../../../utils/logger'

const log = new Logger("Application Loader > Dark Mode")

export const setUpDarkMode = async (): Promise<void> => {
  setDarkMode(loadDarkModeFromLocalStorage() ?? determineDarkModeBrowserSetting() ?? false)
  return Promise.resolve()
}

const determineDarkModeBrowserSetting = (): boolean | undefined => {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  } catch (error) {
    log.error('Can not determine setting from browser', error)
    return undefined
  }
}

const loadDarkModeFromLocalStorage = (): boolean | undefined => {
  try {
    const storedValue = window.localStorage.getItem('darkMode')
    if (!storedValue) {
      return undefined
    }
    return storedValue === 'true'
  } catch (error) {
    log.error('Loading from local storage failed', error)
    return undefined
  }
}
