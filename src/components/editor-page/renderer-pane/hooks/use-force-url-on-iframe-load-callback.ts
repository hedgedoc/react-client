/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { RefObject, useCallback, useRef } from 'react'
import { Logger } from '../../../../utils/logger'

const log = new Logger('IframeLoader')

/**
 * Generates a callback for a iframe load handler, that enforces a given URL if frame navigates away.
 *
 * @param iFrameReference A reference to the iframe react dom element.
 * @param forcedUrl The url that should be enforced.
 * @param onNavigateAway An optional callback that is executed when the iframe leaves the enforced URL.
 * @param onWindowChange An optional callback that is executed if the location changes and a new window object was created.
 */
export const useForceUrlOnIframeLoadCallback = (
  iFrameReference: RefObject<HTMLIFrameElement>,
  forcedUrl: string,
  onNavigateAway?: () => void,
  onWindowChange?: (window: Window | null) => void
): (() => void) => {
  const redirectionInProgress = useRef<boolean>(true)

  return useCallback(() => {
    const frame = iFrameReference.current
    if (!frame || !frame.contentWindow) {
      onWindowChange?.(null)
    } else if (redirectionInProgress.current) {
      onWindowChange?.(frame.contentWindow)
      redirectionInProgress.current = false
    } else {
      onNavigateAway?.()
      log.warn('Navigated away from unknown URL')
      redirectionInProgress.current = true
      frame.src = forcedUrl
    }
  }, [iFrameReference, onNavigateAway, onWindowChange, forcedUrl])
}
