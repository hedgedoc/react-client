/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { ShowIf } from '../../common/show-if/show-if'
import { ClearHistoryButton } from './clear-history-button'
import { ExportHistoryButton } from './export-history-button'
import { ImportHistoryButton } from './import-history-button'
import { importHistoryEntries, safeRefreshHistoryState, setHistoryEntries } from '../../../redux/history/methods'
import { showErrorNotification } from '../../../redux/ui-notifications/methods'
import { useApplicationState } from '../../../hooks/common/use-application-state'
import { KeywordSearchInput } from './keyword-search-input'
import { TagSelectionInput } from './tag-selection-input'
import { HistoryRefreshButton } from './history-refresh-button'
import { SortByTitleButton } from './sort-by-title-button'
import { SortByLastVisitedButton } from './sort-by-last-visited-button'
import { HistoryViewModeToggleButton } from './history-view-mode-toggle-button'
import { useSyncToolbarStateToUrlEffect } from './toolbar-context/use-sync-toolbar-state-to-url-effect'
import { HistoryEntryOrigin } from '../../../api/history/types'

export enum ViewStateEnum {
  CARD,
  TABLE
}

/**
 * Renders the toolbar for the history page that contains controls for filtering and sorting.
 */
export const HistoryToolbar: React.FC = () => {
  const { t } = useTranslation()
  const historyEntries = useApplicationState((state) => state.history)
  const userExists = useApplicationState((state) => !!state.user)

  useSyncToolbarStateToUrlEffect()

  const onUploadAllToRemote = useCallback(() => {
    if (!userExists) {
      return
    }
    const localEntries = historyEntries
      .filter((entry) => entry.origin === HistoryEntryOrigin.LOCAL)
      .map((entry) => entry.identifier)
    historyEntries.forEach((entry) => (entry.origin = HistoryEntryOrigin.REMOTE))
    importHistoryEntries(historyEntries).catch((error: Error) => {
      showErrorNotification('landing.history.error.setHistory.text')(error)
      historyEntries.forEach((entry) => {
        if (localEntries.includes(entry.identifier)) {
          entry.origin = HistoryEntryOrigin.LOCAL
        }
      })
      setHistoryEntries(historyEntries)
      safeRefreshHistoryState()
    })
  }, [userExists, historyEntries])

  return (
    <Form inline={true}>
      <InputGroup className={'mr-1 mb-1'}>
        <TagSelectionInput />
      </InputGroup>
      <InputGroup className={'mr-1 mb-1'}>
        <KeywordSearchInput />
      </InputGroup>
      <InputGroup className={'mr-1 mb-1'}>
        <SortByTitleButton />
      </InputGroup>
      <InputGroup className={'mr-1 mb-1'}>
        <SortByLastVisitedButton />
      </InputGroup>
      <InputGroup className={'mr-1 mb-1'}>
        <ExportHistoryButton />
      </InputGroup>
      <InputGroup className={'mr-1 mb-1'}>
        <ImportHistoryButton />
      </InputGroup>
      <InputGroup className={'mr-1 mb-1'}>
        <ClearHistoryButton />
      </InputGroup>
      <InputGroup className={'mr-1 mb-1'}>
        <HistoryRefreshButton />
      </InputGroup>
      <ShowIf condition={userExists}>
        <InputGroup className={'mr-1 mb-1'}>
          <Button variant={'light'} title={t('landing.history.toolbar.uploadAll')} onClick={onUploadAllToRemote}>
            <ForkAwesomeIcon icon='cloud-upload' />
          </Button>
        </InputGroup>
      </ShowIf>
      <InputGroup className={'mr-1 mb-1'}>
        <HistoryViewModeToggleButton />
      </InputGroup>
    </Form>
  )
}
