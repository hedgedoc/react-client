/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useIsDarkModeActivated } from '../../../../hooks/common/use-is-dark-mode-activated'
import { useDoIfRendererReady } from '../../../render-page/window-post-message-communicator/hooks/use-do-if-renderer-ready'
import { useCallback } from 'react'
import { CommunicationMessageType } from '../../../render-page/window-post-message-communicator/rendering-message'
import { useEditorToRendererCommunicator } from '../../render-context/iframe-editor-to-renderer-communicator-context-provider'

/**
 * Sends the current dark mode setting to the renderer.
 *
 * @param forcedDarkMode Overwrites the value from the global application states if set.
 */
export const useSendDarkModeStatus = (forcedDarkMode?: boolean): void => {
  const iframeCommunicator = useEditorToRendererCommunicator()
  const savedDarkMode = useIsDarkModeActivated()

  useDoIfRendererReady(
    useCallback(
      () =>
        iframeCommunicator.sendMessageToOtherSide({
          type: CommunicationMessageType.SET_DARKMODE,
          activated: forcedDarkMode ?? savedDarkMode
        }),
      [savedDarkMode, forcedDarkMode, iframeCommunicator]
    )
  )
}
