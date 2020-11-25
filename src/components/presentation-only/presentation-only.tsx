/*
SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)

SPDX-License-Identifier: AGPL-3.0-only
*/

import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import { getNote, Note } from '../../api/notes'
import { useApplyDarkMode } from '../../hooks/common/use-apply-dark-mode'
import { useDocumentTitle } from '../../hooks/common/use-document-title'
import { setDocumentContent } from '../../redux/document-content/methods'
import { ShowIf } from '../common/show-if/show-if'
import { EditorPathParams } from '../editor/editor'

export const PresentationOnly: React.FC = () => {
  const { t } = useTranslation()
  const { id } = useParams<EditorPathParams>()
  const untitledNote = t('editor.untitledNote')
  const [documentTitle, setDocumentTitle] = useState(untitledNote)
  const [noteData, setNoteData] = useState<Note>()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getNote(id)
      .then(note => {
        setNoteData(note)
        setDocumentContent(note.content)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [id])

  useApplyDarkMode()
  useDocumentTitle(documentTitle)

  return (
    <div className={'d-flex flex-column mvh-100'}>
      <div className={'container'}>
        <ShowIf condition={error}>
          <Alert variant={'danger'} className={'my-2'}>
            <b><Trans i18nKey={'views.readOnly.error.title'}/></b>
            <br/>
            <Trans i18nKey={'views.readOnly.error.description'}/>
          </Alert>
        </ShowIf>
        <ShowIf condition={loading}>
          <Alert variant={'info'} className={'my-2'}>
            <Trans i18nKey={'views.readOnly.loading'}/>
          </Alert>
        </ShowIf>
      </div>
      <ShowIf condition={!error && !loading}>
        <div className="reveal">
          <div className="slides">
            {noteData?.content}
          </div>
        </div>
      </ShowIf>
    </div>
  )
}
