/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useCallback, useRef } from 'react'
import { CommunicationMessages, EditorToRendererMessageType } from '../rendering-message'
import { useEditorToRendererCommunicator } from '../../../editor-page/render-context/editor-to-renderer-communicator-context-provider'
import { PostMessage } from '../window-post-message-communicator'
import { useEffectOnRendererReady } from './use-effect-on-renderer-ready'
import equal from 'fast-deep-equal'

export type SendToRendererEqualPayload = Extract<CommunicationMessages, PostMessage<EditorToRendererMessageType>>
export const useSendToRendererEqual = <R extends SendToRendererEqualPayload>(
  message: R | undefined
): void => {
  const iframeCommunicator = useEditorToRendererCommunicator()
  const oldMessage = useRef<R | undefined>(undefined)

  useEffectOnRendererReady(
    useCallback(() => {
      if (message && !equal(message, oldMessage.current)) {
        oldMessage.current = message
        iframeCommunicator.sendMessageToOtherSide(message)
      }
    }, [iframeCommunicator, message])
  )
}
