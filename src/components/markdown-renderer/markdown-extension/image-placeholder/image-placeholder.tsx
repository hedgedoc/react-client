/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useRef } from 'react'
import { Button } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import './image-placeholder.scss'
import { usePlaceholderSizeStyle } from './build-placeholder-size-css'
import { acceptedMimeTypes } from '../../../common/upload-image-mimetypes'
import { useOnImageUpload } from './hooks/use-on-image-upload'

export interface PlaceholderImageFrameProps {
  alt?: string
  title?: string
  width?: string | number
  height?: string | number
  lineIndex?: number
  placeholderIndexInLine?: number
}

/**
 * Shows a placeholder for an actual image with the possibility to upload images via button or drag'n'drop.
 *
 * @param alt The alt text of the image. Will be shown in the placeholder
 * @param title The title text of the image. Will be shown in the placeholder
 * @param width The width of the placeholder
 * @param height The height of the placeholder
 * @param lineIndex The index of the line in the markdown content where the placeholder is defined
 * @param placeholderIndexInLine The index of the placeholder in the markdown line
 */
export const ImagePlaceholder: React.FC<PlaceholderImageFrameProps> = ({
  alt,
  title,
  width,
  height,
  lineIndex,
  placeholderIndexInLine
}) => {
  useTranslation()
  const fileInputReference = useRef<HTMLInputElement>(null)
  const onImageUpload = useOnImageUpload(lineIndex, placeholderIndexInLine)

  const onDropHandler = useCallback(
    (event: React.DragEvent<HTMLSpanElement>) => {
      event.preventDefault()
      if (event?.dataTransfer?.files?.length > 0) {
        onImageUpload(event.dataTransfer.files[0])
      }
    },
    [onImageUpload]
  )

  const onDragOverHandler = useCallback((event: React.DragEvent<HTMLSpanElement>) => event.preventDefault(), [])

  const onChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files
      if (!fileList || fileList.length < 1) {
        return
      }
      onImageUpload(fileList[0])
    },
    [onImageUpload]
  )

  const uploadButtonClicked = useCallback(() => fileInputReference.current?.click(), [])
  const containerStyle = usePlaceholderSizeStyle(width, height)

  return (
    <span
      className='image-drop d-inline-flex flex-column align-items-center bg-primary text-light p-1'
      style={containerStyle}
      onDrop={onDropHandler}
      onDragOver={onDragOverHandler}>
      <input
        type='file'
        className='d-none'
        accept={acceptedMimeTypes}
        onChange={onChangeHandler}
        ref={fileInputReference}
      />
      <div className={'align-items-center flex-column justify-content-center flex-fill d-flex text-white'}>
        <div className={'d-flex flex-column'}>
          <span className='my-2'>
            <Trans i18nKey={'editor.embeddings.placeholderImage.placeholderText'} />
          </span>
          <span className={'altText'}>{alt ?? title ?? ''}</span>
        </div>
      </div>
      <Button size={'sm'} variant={'light'} onClick={uploadButtonClicked}>
        <ForkAwesomeIcon icon={'upload'} fixedWidth={true} className='my-2' />
        <Trans i18nKey={'editor.embeddings.placeholderImage.upload'} className='my-2' />
      </Button>
    </span>
  )
}