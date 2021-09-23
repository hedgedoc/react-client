/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useCallback, useRef } from 'react'
import { ScrollState } from '../../synced-scroll/scroll-props'
import { CommunicationMessageType } from '../../../render-page/window-post-message-communicator/rendering-message'
import { useEffectOnRendererReady } from '../../../render-page/window-post-message-communicator/hooks/use-effect-on-renderer-ready'
import equal from 'fast-deep-equal'
import { useEditorToRendererCommunicator } from '../../render-context/iframe-editor-to-renderer-communicator-context-provider'

export const useSendScrollState = (scrollState: ScrollState | undefined): void => {
  const iframeCommunicator = useEditorToRendererCommunicator()
  const oldScrollState = useRef<ScrollState | undefined>(undefined)

  useEffectOnRendererReady(
    useCallback(() => {
      if (scrollState && !equal(scrollState, oldScrollState.current)) {
        oldScrollState.current = scrollState
        iframeCommunicator.sendMessageToOtherSide({ type: CommunicationMessageType.SET_SCROLL_STATE, scrollState })
      }
    }, [iframeCommunicator, scrollState])
  )
}
