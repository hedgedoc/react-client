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
import Optional from 'optional-js'

const log = new Logger('useOnImageUpload')
const imageWithPlaceholderLinkRegex = /(!\[[^\]]*]\(https:\/\/\))/g

/**
 * Receives {@link CommunicationMessageType.IMAGE_UPLOAD image upload events} via iframe communication and processes the attached uploads.
 *
 * @param editor The {@link Editor codemirror editor} that should be used to change the markdown code
 */
export const useOnImageUploadFromRenderer = (editor: Editor | undefined): void => {
  useEditorReceiveHandler(
    CommunicationMessageType.IMAGE_UPLOAD,
    useCallback(
      (values: ImageUploadMessage) => {
        const { dataUri, fileName, lineIndex, placeholderIndexInLine } = values
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
            const [cursorFrom, cursorTo] = Optional.ofNullable(lineIndex)
              .map((actualLineIndex) =>
                calculatePlaceholderPositionInMarkdownContent(actualLineIndex, placeholderIndexInLine)
              )
              .orElseGet(() => calculateInsertAtCurrentCursorPosition(editor))
            handleUpload(file, editor, cursorFrom, cursorTo)
          })
          .catch((error) => log.error(error))
      },
      [editor]
    )
  )
}

/**
 * Calculates the start and end cursor position of the right image placeholder in the current markdown content.
 *
 * @param lineIndex The index of the line to change in the current markdown content.
 * @param replacementIndexInLine If multiple image placeholders are present in the target line then this number describes the index of the wanted placeholder.
 * @return the calculated start and end position or undefined if no position could be determined
 */
const calculatePlaceholderPositionInMarkdownContent = (
  lineIndex: number,
  replacementIndexInLine = 0
): [Position, Position] | undefined => {
  const currentMarkdownContentLines = store.getState().noteDetails.markdownContent.split('\n')
  const lineAtIndex = currentMarkdownContentLines[lineIndex]
  if (lineAtIndex === undefined) {
    return
  }
  return findImagePlaceholderInLine(currentMarkdownContentLines[lineIndex], lineIndex, replacementIndexInLine)
}

/**
 * Tries to find the right image placeholder in the given line.
 *
 * @param line The line that should be inspected
 * @param lineIndex The index of the line in the document
 * @param replacementIndexInLine If multiple image placeholders are present in the target line then this number describes the index of the wanted placeholder.
 * @return the calculated start and end position or undefined if no position could be determined
 */
const findImagePlaceholderInLine = (
  line: string,
  lineIndex: number,
  replacementIndexInLine = 0
): [Position, Position] | undefined => {
  const startOfImageTag = findRegexMatchInLine(line, imageWithPlaceholderLinkRegex, replacementIndexInLine)
  if (startOfImageTag === undefined || startOfImageTag.index === undefined) {
    return
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

/**
 * Calculates a fallback position that is the current editor cursor position.
 * This wouldn't replace anything and only insert.
 *
 * @param editor The editor whose cursor should be used
 */
const calculateInsertAtCurrentCursorPosition = (editor: Editor): [Position, Position] => {
  const editorCursor = editor.getCursor()
  return [editorCursor, editorCursor]
}
