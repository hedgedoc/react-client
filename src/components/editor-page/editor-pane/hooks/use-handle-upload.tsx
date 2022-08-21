/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { uploadFile } from '../../../../api/media'
import { getGlobalState } from '../../../../redux'
import { supportedMimeTypes } from '../../../common/upload-image-mimetypes'
import { t } from 'i18next'
import { useCallback } from 'react'
import { changeEditorContent } from '../../change-content-context/use-change-editor-content-callback'
import { replaceSelection } from '../tool-bar/formatters/replace-selection'
import { replaceInContent } from '../tool-bar/formatters/replace-in-content'
import type { CursorSelection } from '../tool-bar/formatters/types/cursor-selection'
import type { EditorView } from '@codemirror/view'
import type { ContentFormatter } from '../../change-content-context/change-content-context'
import { showErrorNotification } from '../../../../redux/ui-notifications/methods'

/**
 * @param view the codemirror instance that is used to insert the Markdown code
 * @param file The file to upload
 * @param cursorSelection The position where the progress message should be placed
 * @param description The text that should be used in the description part of the resulting image tag
 * @param additionalUrlText Additional text that should be inserted behind the link but within the tag
 */
type handleUploadSignature = (
  view: EditorView,
  file: File,
  cursorSelection?: CursorSelection,
  description?: string,
  additionalUrlText?: string
) => void

/**
 * Provides a callback that uploads a given file and inserts the correct Markdown code into the current editor.
 */
export const useHandleUpload = (): handleUploadSignature => {
  return useCallback((view, file, cursorSelection, description, additionalUrlText) => {
    const changeContent = (callback: ContentFormatter) => changeEditorContent(view, callback)
    if (!file || !supportedMimeTypes.includes(file.type) || !changeContent) {
      return
    }
    const randomId = Math.random().toString(36).slice(7)
    const uploadFileInfo = description
      ? t('editor.upload.uploadFile.withDescription', { fileName: file.name, description: description })
      : t('editor.upload.uploadFile.withoutDescription', { fileName: file.name })

    const uploadPlaceholder = `![${uploadFileInfo}](upload-${randomId}${additionalUrlText ?? ''})`
    const noteId = getGlobalState().noteDetails.id
    changeContent(({ currentSelection }) => {
      return replaceSelection(cursorSelection ?? currentSelection, uploadPlaceholder, false)
    })
    uploadFile(noteId, file)
      .then(({ url }) => {
        const replacement = `![${description ?? file.name ?? ''}](${url}${additionalUrlText ?? ''})`
        changeContent(({ markdownContent }) => [
          replaceInContent(markdownContent, uploadPlaceholder, replacement),
          undefined
        ])
      })
      .catch((error: Error) => {
        showErrorNotification('editor.upload.failed', { fileName: file.name })(error)
        const replacement = `![upload of ${file.name} failed]()`
        changeContent(({ markdownContent }) => [
          replaceInContent(markdownContent, uploadPlaceholder, replacement),
          undefined
        ])
      })
  }, [])
}
