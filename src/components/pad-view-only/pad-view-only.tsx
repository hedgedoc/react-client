/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useApplyDarkMode } from '../../hooks/common/use-apply-dark-mode'
import { useDocumentTitleWithNoteTitle } from '../../hooks/common/use-document-title-with-note-title'
import { useMarkdownContent } from '../../hooks/common/use-markdown-content'
import { ApplicationState } from '../../redux'
import { setNoteMetadata, updateNoteTitleByFirstHeading } from '../../redux/note-content/methods'
import { MotdBanner } from '../common/motd-banner/motd-banner'
import { ShowIf } from '../common/show-if/show-if'
import { AppBar, AppBarMode } from '../editor/app-bar/app-bar'
import { DocumentIframe } from '../editor/document-renderer-pane/document-iframe'
import { EditorPathParams } from '../editor/editor'
import { useLoadNoteFromServer } from '../editor/useLoadNoteFromServer'
import { DocumentInfobar } from './document-infobar'
import { ErrorWhileLoadingNoteAlert } from './ErrorWhileLoadingNoteAlert'
import { LoadingNoteAlert } from './LoadingNoteAlert'

export const PadViewOnly: React.FC = () => {

  useTranslation()
  const { id } = useParams<EditorPathParams>()

  useApplyDarkMode()
  useDocumentTitleWithNoteTitle()

  const onFirstHeadingChange = useCallback(updateNoteTitleByFirstHeading, [])
  const onMetadataChange = useCallback(setNoteMetadata, [])
  const [error, loading] = useLoadNoteFromServer()
  const markdownContent = useMarkdownContent()
  const noteMetaData = useSelector((state: ApplicationState) => state.noteContent)

  return (
    <div className={'d-flex flex-column mvh-100 bg-light'}>
      <MotdBanner/>
      <AppBar mode={AppBarMode.BASIC}/>
      <div className={'container'}>
        <ErrorWhileLoadingNoteAlert show={error}/>
        <LoadingNoteAlert show={loading}/>
      </div>
      <ShowIf condition={!error && !loading}>
        <DocumentInfobar
          changedAuthor={noteMetaData.lastChange.userId ?? ''}
          changedTime={noteMetaData.lastChange.timestamp}
          createdAuthor={'Test'}
          createdTime={noteMetaData.createTime}
          editable={true}
          noteId={id}
          viewCount={noteMetaData.viewCount}
        />
        <DocumentIframe extraClasses={"flex-fill"}
                        markdownContent={markdownContent}
                        onFirstHeadingChange={onFirstHeadingChange}
                        onMetadataChange={onMetadataChange}/>
      </ShowIf>
    </div>
  )
}
