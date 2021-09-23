/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect } from 'react'
import { CommunicationMessages, RendererToEditorMessageType } from '../rendering-message'
import { useEditorToRendererCommunicator } from '../../../editor-page/render-context/editor-to-renderer-communicator-context-provider'
import { Handler } from '../window-post-message-communicator'

/**
 * Sets the handler for the given message type in the current editor to renderer communicator.
 *
 * @param messageType The message type that should be used to listen to.
 * @param handler The handler that should be called if a message with the given message type was received.
 */
export const useEditorReceiveHandler = <R extends RendererToEditorMessageType>(
  messageType: R,
  handler: Handler<CommunicationMessages, R>
): void => {
  const editorToRendererCommunicator = useEditorToRendererCommunicator()
  useEffect(() => {
    editorToRendererCommunicator.setHandler(messageType, handler)
    return () => {
      editorToRendererCommunicator.setHandler(messageType, undefined)
    }
  }, [editorToRendererCommunicator, handler, messageType])
}
