/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import sanitize from 'sanitize-filename'
import { store } from '../../../redux'
import { Trans, useTranslation } from 'react-i18next'
import { download } from '../../common/download/download'
import { SidebarButton } from './sidebar-button'
import { useNoteMarkdownContent } from '../../../hooks/common/use-note-markdown-content'
import { testId } from '../../../utils/cypress-attribute'

export const ExportMarkdownSidebarEntry: React.FC = () => {
  const { t } = useTranslation()
  const markdownContent = useNoteMarkdownContent()
  const onClick = useCallback(() => {
    const sanitized = sanitize(store.getState().noteDetails.noteTitle)
    download(markdownContent, `${sanitized !== '' ? sanitized : t('editor.untitledNote')}.md`, 'text/markdown')
  }, [markdownContent, t])

  return (
    <SidebarButton {...testId('menu-export-markdown')} onClick={onClick} icon={'file-text'}>
      <Trans i18nKey={'editor.export.markdown-file'} />
    </SidebarButton>
  )
}
