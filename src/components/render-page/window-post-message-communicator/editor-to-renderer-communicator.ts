/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { WindowPostMessageCommunicator } from './window-post-message-communicator'
import type {
  CommunicationMessages,
  EditorToRendererMessageType,
  RendererToEditorMessageType
} from './rendering-message'
import { Logger } from '../../../utils/logger'

/**
 * The communicator that is used to send messages from the editor to the renderer.
 */
export class EditorToRendererCommunicator extends WindowPostMessageCommunicator<
  RendererToEditorMessageType,
  EditorToRendererMessageType,
  CommunicationMessages
> {
  protected createLogger(): Logger {
    return new Logger('EditorToRendererCommunicator')
  }
}
