/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment, useCallback, useRef } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { SidebarButton } from '../sidebar-button/sidebar-button'
import { UploadInput } from '../upload-input'
import { cypressId } from '../../../../utils/cypress-attribute'
import { useChangeEditorContentCallback } from '../../change-content-context/use-change-editor-content-callback'
import { ShowIf } from '../../../common/show-if/show-if'

/**
 * Reads the given file content as text.
 *
 * @param file The file to read
 * @return the file content
 */
const readFile = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.addEventListener('load', () => {
      resolve(fileReader.result as string)
    })
    fileReader.addEventListener('error', (error) => {
      reject(error)
    })
    fileReader.readAsText(file)
  })
}

export const ImportMarkdownSidebarEntry: React.FC = () => {
  useTranslation()
  const changeEditorContent = useChangeEditorContentCallback()

  const onImportMarkdown = useCallback(
    async (file: File): Promise<void> => {
      const content = await readFile(file)
      changeEditorContent?.(({ markdownContent }) => {
        const newContent = (markdownContent.length === 0 ? '' : '\n') + content
        return [
          [
            {
              from: markdownContent.length,
              to: markdownContent.length,
              insert: newContent
            }
          ],
          undefined
        ]
      })
    },
    [changeEditorContent]
  )

  const clickRef = useRef<() => void>()
  const buttonClick = useCallback(() => {
    clickRef.current?.()
  }, [])

  return (
    <Fragment>
      <SidebarButton
        {...cypressId('menu-import-markdown-button')}
        icon={'file-text-o'}
        onClick={buttonClick}
        disabled={!changeEditorContent}>
        <Trans i18nKey={'editor.import.file'} />
      </SidebarButton>
      <ShowIf condition={!!changeEditorContent}>
        <UploadInput
          onLoad={onImportMarkdown}
          {...cypressId('menu-import-markdown-input')}
          acceptedFiles={'.md, text/markdown, text/plain'}
          onClickRef={clickRef}
        />
      </ShowIf>
    </Fragment>
  )
}
