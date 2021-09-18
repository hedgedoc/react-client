/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect } from 'react'
import { useApplicationState } from '../../../../hooks/common/use-application-state'

/**
 * Executes the given callback as it changes or the renderer is ready for receiving messages.
 *
 * @param sendOnReadyCallback The callback that should get executed.
 */
export const useDoIfRendererReady = (sendOnReadyCallback: () => void): void => {
  const rendererReady = useApplicationState((state) => state.rendererStatus.rendererReady)

  useEffect(() => {
    if (rendererReady) {
      sendOnReadyCallback()
    }
  }, [rendererReady, sendOnReadyCallback])
}
