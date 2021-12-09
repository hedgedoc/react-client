/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { usePlaceholderSizeStyle } from '../image-placeholder/hooks/use-placeholder-size-style'

export interface PlaceholderImageFrameProps {
  width?: string | number
  height?: string | number
}

/**
 * Shows a placeholder frame for images that are currently uploaded.
 *
 * @param width The frame width
 * @param height The frame height
 */
export const UploadIndicatingFrame: React.FC<PlaceholderImageFrameProps> = ({ width, height }) => {
  const containerStyle = usePlaceholderSizeStyle(width, height)

  return (
    <span
      className='image-drop d-inline-flex flex-column align-items-center justify-content-center bg-primary text-white p-4'
      style={containerStyle}>
      <span className={'h1 border-bottom-0 my-2'}>Uploading image...</span>
      <ForkAwesomeIcon icon={'cog'} size={'5x'} fixedWidth={true} className='my-2 fa-spin' />
    </span>
  )
}
