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
  'image/jpeg, image/png',
  'image/svg+xml',
  'image/tiff',
  'image/webp'
]

export interface useFilePickerReturn {
  clickOnHiddenFileInput: () => void,
  HiddenFileInput(): React.ReactElement
}

export const useFilePicker = (editor: Editor | undefined): useFilePickerReturn => {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  return {
    clickOnHiddenFileInput: () => {
      if (fileInputRef?.current) {
        fileInputRef.current.click()
      }
    },
    HiddenFileInput (): React.ReactElement {
      return (
        <input
          type="file"
          ref={fileInputRef}
          multiple={false}
          accept={supportedMimeTypes.join(', ')}
          style={{ display: 'none' }}
          onChange={(evt): void => {
            const target = evt.target as HTMLInputElement
            handleUpload(target.files, editor)
          }}
        />
      )
    }
  }
}
