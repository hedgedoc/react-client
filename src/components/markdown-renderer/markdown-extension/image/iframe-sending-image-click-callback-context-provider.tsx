/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { useRendererToEditorCommunicator } from '../../../editor-page/render-context/renderer-to-editor-communicator-context-provider'
import { CommunicationMessageType } from '../../../render-page/window-post-message-communicator/rendering-message'
import type { onImageDetailsPost } from './image-click-callback-context';
import { ImageClickCallbackProvider } from './image-click-callback-context'

export const IframeSendingImageClickCallbackContextProvider: React.FC = ({ children }) => {
  const communicator = useRendererToEditorCommunicator()

  const onImageDetailsPost: onImageDetailsPost = useCallback(
    (imageDetails) => {
      communicator.sendMessageToOtherSide({
        type: CommunicationMessageType.IMAGE_CLICKED,
        details: imageDetails
      })
    },
    [communicator]
  )

  return <ImageClickCallbackProvider onImageDetailsPost={onImageDetailsPost}>{children}</ImageClickCallbackProvider>
}
