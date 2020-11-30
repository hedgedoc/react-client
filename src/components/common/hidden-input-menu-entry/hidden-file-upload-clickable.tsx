/*
SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)

SPDX-License-Identifier: AGPL-3.0-only
*/

import React, { Fragment, ReactElement, useCallback, useRef } from 'react'

export interface HiddenFileUploadClickableProps {
  acceptedFiles: string
  onLoad: (file: File) => Promise<void>
  onCreateRenderComponent: (onClick: () => void) => ReactElement
}

export const HiddenFileUploadClickable: React.FC<HiddenFileUploadClickableProps> = ({ acceptedFiles, onLoad, onCreateRenderComponent }) => {
  const fileInputReference = useRef<HTMLInputElement>(null)
  const onClick = useCallback(() => {
    const fileInput = fileInputReference.current
    if (!fileInput) {
      return
    }
    fileInput.addEventListener('change', () => {
      if (!fileInput.files || fileInput.files.length < 1) {
        return
      }
      const file = fileInput.files[0]
      onLoad(file).then(() => {
        fileInput.value = ''
      }).catch((error) => {
        console.error(error)
      })
    })
    fileInput.click()
  }, [onLoad])

  return (
    <Fragment>
      <input type='file' ref={fileInputReference} className='d-none' accept={acceptedFiles}/>
      { onCreateRenderComponent(onClick) }
    </Fragment>
  )
}
