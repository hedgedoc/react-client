/*
SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)

SPDX-License-Identifier: AGPL-3.0-only
*/
import CodeMirror from 'codemirror'
import React, { ReactElement, useCallback } from 'react'
import Button from 'react-bootstrap/Button'
import { useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../../common/fork-awesome/fork-awesome-icon'
import { HiddenFileUploadClickable } from '../../../common/hidden-input-menu-entry/hidden-file-upload-clickable'
import { handleUpload } from '../upload-handler'
import { supportedMimeTypesJoined } from './utils/upload-image-mimetypes'

export interface UploadImageButtonProps {
  editor: CodeMirror.Editor
}

export const UploadImageButton: React.FC<UploadImageButtonProps> = ({ editor }) => {
  const { t } = useTranslation()

  const onUploadImage = useCallback((file: File) => {
    if (editor) {
      handleUpload(file, editor)
    }
    return Promise.resolve()
  }, [editor])

  const onCreateRenderComponent = useCallback<(onClick: () => void) => ReactElement>((onClick) => (
    <Button variant='light' onClick={onClick} title={t('editor.editorToolbar.uploadImage')}>
      <ForkAwesomeIcon icon={'upload'}/>
    </Button>), [t])

  return <HiddenFileUploadClickable onCreateRenderComponent={onCreateRenderComponent} acceptedFiles={supportedMimeTypesJoined} onLoad={onUploadImage}/>
}
