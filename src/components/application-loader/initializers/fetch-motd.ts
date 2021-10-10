/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { setMotd } from '../../../redux/motd/methods'
import { defaultFetchConfig } from '../../../api/utils'
import { Logger } from '../../../utils/logger'

export const MOTD_LOCAL_STORAGE_KEY = 'motd.lastModified'
const log = new Logger('Motd')

/**
 * Fetches the current motd from the backend and sets the content in the global application state.
 * If the motd hasn't changed since the last time then nothing the global application state won't be changed.
 * To check if the motd has changed the "last modified" header from the request
 * will be compared to the saved value from the browser's local storage.
 *
 * @param customizeAssetsUrl the URL where the motd.txt can be found.
 * @return A promise that gets resolved if the motd was fetched successfully.
 */
export const fetchMotd = async (customizeAssetsUrl: string): Promise<void> => {
  const cachedLastModified = window.localStorage.getItem(MOTD_LOCAL_STORAGE_KEY)
  const motdUrl = `${customizeAssetsUrl}motd.txt`

  if (cachedLastModified) {
    const response = await fetch(motdUrl, {
      ...defaultFetchConfig,
      method: 'HEAD'
    })
    if (response.status !== 200) {
      return
    }
    if (response.headers.get('Last-Modified') === cachedLastModified) {
      return
    }
  }

  const response = await fetch(motdUrl, {
    ...defaultFetchConfig
  })

  if (response.status !== 200) {
    return
  }

  const motdText = await response.text()

  const lastModified = response.headers.get('Last-Modified')
  if (!lastModified) {
    log.warn("'Last-Modified' not found for motd.txt!")
  }

  setMotd(motdText, lastModified)
}
