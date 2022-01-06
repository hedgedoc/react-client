/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { ImageDetails } from '../../../render-page/window-post-message-communicator/rendering-message'
import React, { createContext } from 'react'

export type onImageDetailsPost = (imageDetails: ImageDetails) => void

export const imageDetailsPostCallbackContext = createContext<onImageDetailsPost | undefined>(undefined)

export interface ImageClickCallbackProviderProps {
  onImageDetailsPost?: onImageDetailsPost
}

export const ImageClickCallbackProvider: React.FC<ImageClickCallbackProviderProps> = ({
  onImageDetailsPost,
  children
}) => {
  return (
    <imageDetailsPostCallbackContext.Provider value={onImageDetailsPost}>
      {children}
    </imageDetailsPostCallbackContext.Provider>
  )
}
