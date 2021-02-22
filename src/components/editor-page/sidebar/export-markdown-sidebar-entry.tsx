/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import sanitize from 'sanitize-filename'
import { Trans, useTranslation } from 'react-i18next'
import { useNoteMarkdownContent } from '../../../hooks/common/use-note-markdown-content'
import { download } from '../../common/download/download'
import { SidebarButton } from './sidebar-button'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../redux'

export const ExportMarkdownSidebarEntry: React.FC = () => {
  const { t } = useTranslation()
  const noteTitle = useSelector((state: ApplicationState) => state.noteDetails.noteTitle)
  const markdownContent = useNoteMarkdownContent()
  const onClick = useCallback(() => {
    const sanitized = sanitize(noteTitle)
    download(markdownContent, `${ sanitized !== '' ? sanitized : t('editor.untitledNote') }.md`, 'text/markdown')
  }, [markdownContent, noteTitle, t])

  return (
    <SidebarButton data-cy={ 'menu-export-markdown' } onClick={ onClick } icon={ 'file-text' }>
      <Trans i18nKey={ 'editor.export.markdown-file' }/>
    </SidebarButton>
  )
}
