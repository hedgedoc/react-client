/*
SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)

SPDX-License-Identifier: AGPL-3.0-only
*/

import React, { ReactElement, useCallback } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Trans } from 'react-i18next'
import { setDocumentContent } from '../../../redux/document-content/methods'
import { ForkAwesomeIcon } from '../fork-awesome/fork-awesome-icon'
import { HiddenFileUploadClickable } from './hidden-file-upload-clickable'

export interface HiddenFileUploadMenuEntry {
  markdownContent: string
}

export const MarkdownImportFileUploadMenuEntry: React.FC<HiddenFileUploadMenuEntry> = ({ markdownContent }) => {
  const onCreateRenderComponent = useCallback<(onClick: () => void) => ReactElement>((onClick) => (
      <Dropdown.Item className={'small import-md-file'} onClick={onClick}>
        <ForkAwesomeIcon icon={'file-text-o'} className={'mx-2'}/>
        <Trans i18nKey={'editor.import.file'}/>
      </Dropdown.Item>), [])

  const onImportMarkdown = useCallback((file: File) => {
    return new Promise<void>((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        const newContent = fileReader.result as string
        if (markdownContent.length === 0) {
          setDocumentContent(newContent)
        } else {
          setDocumentContent(markdownContent + '\n' + newContent)
        }
      })
      fileReader.addEventListener('loadend', () => {
        resolve()
      })
      fileReader.addEventListener('error', (error) => {
        reject(error)
      })
      fileReader.readAsText(file)
    })
  }, [markdownContent])

  return <HiddenFileUploadClickable onCreateRenderComponent={onCreateRenderComponent} acceptedFiles={'.md, text/markdown, text/plain'} onLoad={onImportMarkdown}/>
}
