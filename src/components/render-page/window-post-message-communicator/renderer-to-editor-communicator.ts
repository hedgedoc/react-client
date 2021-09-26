/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { WindowPostMessageCommunicator } from './window-post-message-communicator'
import { CommunicationMessages, EditorToRendererMessageType, RendererToEditorMessageType } from './rendering-message'
import { Logger } from '../../../utils/logger'

/**
 * The communicator that is used to send messages from the renderer to the editor.
 */
export class RendererToEditorCommunicator extends WindowPostMessageCommunicator<
  EditorToRendererMessageType,
  RendererToEditorMessageType,
  CommunicationMessages
> {
  protected createLogger(): Logger {
    return new Logger('WPMC[E<R]')
  }
}
