/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment, useCallback, useRef } from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { UploadInput } from '../../sidebar/upload-input'
import { acceptedMimeTypes } from '../../../common/upload-image-mimetypes'
import { cypressId } from '../../../../utils/cypress-attribute'
import { useHandleUpload } from '../hooks/use-handle-upload'
import { ShowIf } from '../../../common/show-if/show-if'
import type { CodeMirrorReference } from '../../change-content-context/change-content-context'
import { useCodeMirrorReference } from '../../change-content-context/change-content-context'

const extractSelectedText = (codeMirror: CodeMirrorReference): string | undefined => {
  const state = codeMirror?.state
  if (!state) {
    return
  }
  const from = state.selection.main?.from
  const to = state.selection.main?.to
  if (from === undefined || to === undefined || from === to) {
    return
  }
  return state.sliceDoc(from, to)
}

export const UploadImageButton: React.FC = () => {
  const { t } = useTranslation()
  const clickRef = useRef<() => void>()
  const buttonClick = useCallback(() => {
    clickRef.current?.()
  }, [])

  const handleUpload = useHandleUpload()
  const codeMirror = useCodeMirrorReference()

  const onUploadImage = useCallback(
    (file: File) => {
      const description = extractSelectedText(codeMirror)
      handleUpload(file, undefined, description)
      return Promise.resolve()
    },
    [codeMirror, handleUpload]
  )

  return (
    <Fragment>
      <Button
        variant='light'
        onClick={buttonClick}
        disabled={!codeMirror}
        title={t('editor.editorToolbar.uploadImage')}
        {...cypressId('editor-toolbar-upload-image-button')}>
        <ForkAwesomeIcon icon={'upload'} />
      </Button>
      <ShowIf condition={!!codeMirror}>
        <UploadInput
          onLoad={onUploadImage}
          acceptedFiles={acceptedMimeTypes}
          onClickRef={clickRef}
          {...cypressId('editor-toolbar-upload-image-input')}
        />
      </ShowIf>
    </Fragment>
  )
}
