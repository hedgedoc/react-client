import React, { Fragment, useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import { getHistoryEntry, updateHistoryEntry } from '../../../../api/history'
import { ErrorModal } from '../../../common/modals/error-modal'
import { HistoryEntry } from '../../../history-page/history-page'
import { PinButton } from '../../../history-page/pin-button/pin-button'
import { EditorPathParams } from '../../editor'

export const PinToHistoryButton: React.FC = () => {
  useTranslation()

  const { id } = useParams<EditorPathParams>()
  const [historyEntry, setHistoryEntry] = useState<HistoryEntry>()
  const [pinError, setPinError] = useState(false)

  const i18nKey = !historyEntry?.pinned ? 'editor.documentBar.pinNoteToHistory' : 'editor.documentBar.pinnedToHistory'

  useEffect(() => {
    getHistoryEntry(id)
      .then((entry) => setHistoryEntry(entry))
      .catch(() => console.log('could not get the history entry with the id', id))
  }, [id])

  const changePin = () => {
    if (historyEntry) {
      updateHistoryEntry(id, {
        ...historyEntry,
        pinned: !historyEntry.pinned
      })
        .then(entry => setHistoryEntry(entry))
        .catch(() => setPinError(true))
    }
  }

  return (
    <Fragment>
      <ErrorModal show={pinError} onHide={() => setPinError(false)} titleI18nKey={'editor.error.pinError.title'}>
        <Trans i18nKey={'editor.error.pinError.description'}/>
      </ErrorModal>
      <PinButton
        isPinned={historyEntry?.pinned ?? false}
        onPinClick={() => changePin()}
        isDark={false}
        historyStyle={false}
      >
        <span className={'pl-2'}>
          <Trans i18nKey={i18nKey}/>
        </span>
      </PinButton>
    </Fragment>
  )
}
