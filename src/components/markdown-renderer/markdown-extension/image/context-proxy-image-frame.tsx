/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useContext } from 'react'
import { ProxyImageFrame } from './proxy-image-frame'
import { imageDetailsPostCallbackContext } from './image-click-callback-context'

export type ContextProxyImageFrameProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onClick'>

export const ContextProxyImageFrame: React.FC<ContextProxyImageFrameProps> = (props) => {
  const onImageDetailsPost = useContext(imageDetailsPostCallbackContext)

  const onImageClick = useCallback(
    (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
      if (!onImageDetailsPost) {
        return
      }
      const image = event.target as HTMLImageElement
      if (image.src === '') {
        return
      }
      onImageDetailsPost({
        src: image.src,
        alt: image.alt,
        title: image.title
      })
    },
    [onImageDetailsPost]
  )

  return <ProxyImageFrame onClick={onImageClick} {...props} />
}
