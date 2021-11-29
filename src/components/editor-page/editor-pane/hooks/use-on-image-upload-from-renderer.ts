/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEditorReceiveHandler } from '../../../render-page/window-post-message-communicator/hooks/use-editor-receive-handler'
import type { ImageUploadMessage } from '../../../render-page/window-post-message-communicator/rendering-message'
import { CommunicationMessageType } from '../../../render-page/window-post-message-communicator/rendering-message'
import { useCallback } from 'react'
import { store } from '../../../../redux'
import { handleUpload } from '../upload-handler'
import type { Editor, Position } from 'codemirror'
import { Logger } from '../../../../utils/logger'
import { findRegexMatchInLine } from '../find-regex-match-in-line'

const log = new Logger('useOnImageUpload')

const regex = /(!\[[^\]]*]\(https:\/\/\))/g

export const findImageReplacement = (
  lines: string[],
  lineIndex: number,
  fallbackPosition: Position,
  indexInLine?: number
): [Position, Position] => {
  const line = lines[lineIndex]
  const startOfImageTag = findRegexMatchInLine(line, regex, indexInLine ?? 0)
  if (startOfImageTag === undefined || startOfImageTag.index === undefined) {
    return [fallbackPosition, fallbackPosition]
  }

  return [
    {
      ch: startOfImageTag.index,
      line: lineIndex
    },
    {
      ch: startOfImageTag.index + startOfImageTag[0].length,
      line: lineIndex
    }
  ]
}

export const useOnImageUploadFromRenderer = (editor: Editor | undefined): void => {
  useEditorReceiveHandler(
    CommunicationMessageType.IMAGE_UPLOAD,
    useCallback(
      (values: ImageUploadMessage) => {
        const { dataUri, fileName, line, indexInLine } = values
        if (!editor) {
          return
        }
        if (!dataUri.startsWith('data:image/')) {
          log.error('Received uri is no data uri and image!')
          return
        }

        fetch(dataUri)
          .then((result) => result.blob())
          .then((blob) => {
            const file = new File([blob], fileName, { type: blob.type })
            let cursorFrom, cursorTo
            if (line === undefined) {
              cursorFrom = cursorTo = editor.getCursor()
            } else {
              const lines = store.getState().noteDetails.markdownContent.split('\n')
              const replacementCursors = findImageReplacement(lines, line, editor.getCursor(), indexInLine)
              cursorFrom = replacementCursors[0]
              cursorTo = replacementCursors[1]
            }
            handleUpload(file, editor, cursorFrom, cursorTo)
          })
          .catch((error) => log.error(error))
      },
      [editor]
    )
  )
}
