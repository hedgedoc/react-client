/*
 SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)

 SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { Row } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../redux'
import { HistoryContent } from './history-content/history-content'
import { HistoryToolbar, HistoryToolbarState, initState as toolbarInitState } from './history-toolbar/history-toolbar'
import { sortAndFilterEntries } from './utils'
import { refreshHistoryState } from '../../redux/history/methods'
import { HistoryEntry } from '../../redux/history/types'
import { showErrorNotification } from '../notifications/error-notification'

export const HistoryPage: React.FC = () => {
  const { t } = useTranslation()

  const allEntries = useSelector((state: ApplicationState) => state.history)
  const [toolbarState, setToolbarState] = useState<HistoryToolbarState>(toolbarInitState)

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
    refreshHistoryState().catch(
      showErrorNotification(t('landing.history.error.getHistory.text'))
    )
  }, [t])

  return (
    <Fragment>
      <h1 className="mb-4">
        <Trans i18nKey="landing.navigation.history"/>
      </h1>
      <Row className={ 'justify-content-center mt-5 mb-3' }>
        <HistoryToolbar
          onSettingsChange={ setToolbarState }
          tags={ tags }
        />
      </Row>
      <HistoryContent
        viewState={ toolbarState.viewState }
        entries={ entriesToShow }
      />
    </Fragment>
  )
}
