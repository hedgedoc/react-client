/*
 SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)

 SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { Row } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { deleteNote } from '../../api/notes'
import { ApplicationState } from '../../redux'
import { ErrorModal } from '../common/modals/error-modal'
import { HistoryContent } from './history-content/history-content'
import { HistoryToolbar, HistoryToolbarState, initState as toolbarInitState } from './history-toolbar/history-toolbar'
import { sortAndFilterEntries } from './utils'
import { HistoryEntry } from '../../redux/history/types'
import {
  refreshHistoryState,
  removeHistoryEntry,
  toggleHistoryEntryPinning
} from '../../redux/history/methods'

export const HistoryPage: React.FC = () => {
  useTranslation()

  const allEntries = useSelector((state: ApplicationState) => state.history)
  const [toolbarState, setToolbarState] = useState<HistoryToolbarState>(toolbarInitState)
  const userExists = useSelector((state: ApplicationState) => !!state.user)
  const [error, setError] = useState('')

  const removeFromHistoryClick = useCallback((entryId: string): void => {
    removeHistoryEntry(entryId, () => setError('deleteEntry'))
  }, [])

  const deleteNoteClick = useCallback((entryId: string): void => {
    if (userExists) {
      deleteNote(entryId)
        .then(() => {
          removeHistoryEntry(entryId, () => setError('deleteNote'))
        })
        .catch(() => setError('deleteNote'))
    }
  }, [userExists])

  const pinClick = useCallback((entryId: string): void => {
    toggleHistoryEntryPinning(entryId, () => setError('updateEntry'))
  }, [])

  const resetError = () => {
    setError('')
  }

  const tags = useMemo<string[]>(() => {
    return allEntries.map(entry => entry.tags)
                     .reduce((a, b) => ([...a, ...b]), [])
                     .filter((value, index, array) => {
                       if (index === 0) {
                         return true
                       }
                       return (value !== array[index - 1])
                     })
  }, [allEntries])

  const entriesToShow = useMemo<HistoryEntry[]>(() =>
      sortAndFilterEntries(allEntries, toolbarState),
    [allEntries, toolbarState])

  useEffect(() => {
    refreshHistoryState()
  }, [])

  return (
    <Fragment>
      <ErrorModal show={ error !== '' } onHide={ resetError }
                  titleI18nKey={ error !== '' ? `landing.history.error.${ error }.title` : '' }>
        <h5>
          <Trans i18nKey={ error !== '' ? `landing.history.error.${ error }.text` : '' }/>
        </h5>
      </ErrorModal>
      <h1 className="mb-4"><Trans i18nKey="landing.navigation.history"/></h1>
      <Row className={ 'justify-content-center mt-5 mb-3' }>
        <HistoryToolbar
          onSettingsChange={ setToolbarState }
          tags={ tags }
        />
      </Row>
      <HistoryContent
        viewState={ toolbarState.viewState }
        entries={ entriesToShow }
        onPinClick={ pinClick }
        onRemoveClick={ removeFromHistoryClick }
        onDeleteClick={ deleteNoteClick }
      />
    </Fragment>
  )
}
