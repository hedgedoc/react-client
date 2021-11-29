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
import { buildPlaceholderSizeCss } from './build-placeholder-size-css'
import { useRendererToEditorCommunicator } from '../../../editor-page/render-context/renderer-to-editor-communicator-context-provider'
import { CommunicationMessageType } from '../../../render-page/window-post-message-communicator/rendering-message'
import { Logger } from '../../../../utils/logger'
import { acceptedMimeTypes } from '../../../common/upload-image-mimetypes'

export interface PlaceholderImageFrameProps {
  alt?: string
  title?: string
  width?: string | number
  height?: string | number
  line?: number
  indexInLine?: number
}

const readFileAsDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

const log = new Logger('PlaceholderImageFrame')

export const ImagePlaceholder: React.FC<PlaceholderImageFrameProps> = ({
  alt,
  title,
  width,
  height,
  line,
  indexInLine
}) => {
  useTranslation()
  const fileInputReference = useRef<HTMLInputElement>(null)
  const communicator = useRendererToEditorCommunicator()

  const onImageUpload = useCallback(
    (file: File) => {
      readFileAsDataUrl(file)
        .then((dataUri) => {
          communicator.sendMessageToOtherSide({
            type: CommunicationMessageType.IMAGE_UPLOAD,
            dataUri,
            fileName: file.name,
            line,
            indexInLine
          })
        })
        .catch((error: ProgressEvent) => log.error('Error while uploading image', error))
    },
    [communicator, indexInLine, line]
  )

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

  return (
    <span
      className='image-drop d-inline-flex flex-column align-items-center bg-primary text-light p-1'
      style={buildPlaceholderSizeCss(width, height)}
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
