import React, { Fragment, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { deleteHistory, getHistory, setHistory } from '../../../../api/history'
import { ApplicationState } from '../../../../redux'
import { loadHistoryFromLocalStore, setHistoryToLocalStore, sortAndFilterEntries } from '../../../../utils/historyUtils'
import { ErrorModal } from '../../../error-modal/error-modal'
import { HistoryContent } from './history-content/history-content'
import { HistoryToolbar, HistoryToolbarState, initState as toolbarInitState } from './history-toolbar/history-toolbar'

export interface HistoryEntry {
  id: string,
  title: string,
  lastVisited: Date,
  tags: string[],
  pinned: boolean
}

export type LocatedHistoryEntry = HistoryEntry & HistoryEntryLocation

export interface HistoryEntryLocation {
  location: Location
}

export enum Location {
  LOCAL = 'local',
  REMOTE = 'remote'
}

export interface HistoryJson {
  version: number,
  entries: HistoryEntry[]
}

export const History: React.FC = () => {
  useTranslation()
  const [localHistoryEntries, setLocalHistoryEntries] = useState<HistoryEntry[]>([])
  const [remoteHistoryEntries, setRemoteHistoryEntries] = useState<HistoryEntry[]>([])
  const [toolbarState, setToolbarState] = useState<HistoryToolbarState>(toolbarInitState)
  const user = useSelector((state: ApplicationState) => state.user)
  const [error, setError] = useState('')

  useEffect(() => {
    refreshHistory()
  })

  useEffect(() => {
    if (!localHistoryEntries || localHistoryEntries === []) {
      return
    }
    setHistoryToLocalStore(localHistoryEntries)
  }, [localHistoryEntries])

  const resetError = () => {
    setError('')
  }

  const exportHistory = () => {
    const dataObject: HistoryJson = {
      version: 1,
      entries: localHistoryEntries
    }
    const data = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dataObject))
    const downloadLink = document.createElement('a')
    downloadLink.setAttribute('href', data)
    downloadLink.setAttribute('download', `history_${(new Date()).getTime()}.json`)
    document.body.appendChild(downloadLink)
    downloadLink.click()
    downloadLink.remove()
  }

  const importHistory = (entries: HistoryEntry[]): void => {
    if (user) {
      setHistory(entries)
        .then(() => setRemoteHistoryEntries(entries))
        .catch(() => setError('setHistory'))
    } else {
      setHistoryToLocalStore(entries)
      setLocalHistoryEntries(entries)
    }
  }

  const refreshHistory = () => {
    const localHistory = loadHistoryFromLocalStore()
    setLocalHistoryEntries(localHistory)
    if (user) {
      getHistory()
        .then((remoteHistory) => setRemoteHistoryEntries(remoteHistory))
        .catch(() => setError('getHistory'))
    }
  }

  const clearHistory = () => {
    setLocalHistoryEntries([])
    if (user) {
      deleteHistory()
        .then(() => setRemoteHistoryEntries([]))
        .catch(() => setError('deleteHistory'))
    }
    setHistoryToLocalStore([])
  }

  const syncClick = (entryId: string): void => {
    console.log(entryId)
    // ToDo: add syncClick
  }

  const pinClick = (entryId: string): void => {
    // ToDo: determine if entry is local or remote
    setLocalHistoryEntries((entries) => {
      return entries.map((entry) => {
        if (entry.id === entryId) {
          entry.pinned = !entry.pinned
        }
        return entry
      })
    })
  }

  const tags = localHistoryEntries.map(entry => entry.tags)
    .reduce((a, b) => ([...a, ...b]), [])
    .filter((value, index, array) => {
      if (index === 0) {
        return true
      }
      return (value !== array[index - 1])
    })
  const entriesToShow = sortAndFilterEntries(localHistoryEntries, remoteHistoryEntries, toolbarState)

  return (
    <Fragment>
      <ErrorModal show={error !== ''} onHide={resetError} title={`landing.history.error.${error}.title`}>
        <h5>
          <Trans i18nKey={`landing.history.error.${error}.text`}/>
        </h5>
      </ErrorModal>
      <h1 className="mb-4"><Trans i18nKey="landing.navigation.history"/></h1>
      <Row className={'justify-content-center mt-5 mb-3'}>
        <HistoryToolbar
          onSettingsChange={setToolbarState}
          tags={tags}
          onClearHistory={clearHistory}
          onRefreshHistory={refreshHistory}
          onExportHistory={exportHistory}
          onImportHistory={importHistory}
        />
      </Row>
      <HistoryContent viewState={toolbarState.viewState}
        entries={entriesToShow}
        onPinClick={pinClick}
        onSyncClick={syncClick}
      />
    </Fragment>
  )
}
