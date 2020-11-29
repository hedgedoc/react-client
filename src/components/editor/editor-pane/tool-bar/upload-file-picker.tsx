/*
 * SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Editor } from 'codemirror'
import React from 'react'
import { handleUpload } from '../upload-handler'

export const supportedMimeTypes: string[] = [
  'application/pdf',
  'image/apng',
  'image/bmp',
  'image/gif',
  'image/heif',
  'image/heic',
  'image/heif-sequence',
  'image/heic-sequence',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/webp'
]

const supportedMimeTypesJoined = supportedMimeTypes.join(', ')

export interface UploadFilePickerProps {
  editor: Editor | undefined
  ref: React.RefObject<HTMLInputElement>
}

export const UploadFilePicker: React.FC<UploadFilePickerProps> = ({ editor, ref }) => {
  return (
    <input
      type="file"
      ref={ref}
      multiple={false}
      accept={supportedMimeTypesJoined}
      className='d-none'
      onChange={(evt): void => {
        const target = evt.target as HTMLInputElement
        handleUpload(target.files, editor)
      }}
    />
  )
}
