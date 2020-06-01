import React, { useRef } from 'react'
import { Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../../../../fork-awesome/fork-awesome-icon'
import { HistoryEntry } from '../history'
import './import-history-button.scss'

export interface ImportHistoryButtonProps {
  onImportHistory: (entries: HistoryEntry[]) => void
}

export const ImportHistoryButton: React.FC<ImportHistoryButtonProps> = ({ onImportHistory }) => {
  const { t } = useTranslation()
  const uploadInput = useRef<HTMLInputElement>(null)

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { validity, files } = event.target
    if (files && files[0] && validity.valid) {
      const file = files[0]
      const fileReader = new FileReader()
      fileReader.onload = (event) => {
        if (event.target && event.target.result) {
          const result = event.target.result as string
          const entries = JSON.parse(result) as HistoryEntry[]
          onImportHistory(entries)
        }
      }
      fileReader.readAsText(file)
    } else {
      // Todo handle error
    }
  }

  return (
    <div>
      <input type='file' id='upload-history' className="invisible" accept=".json" onChange={handleUpload}
        ref={uploadInput}/>
      <Button variant={'light'}
        title={t('landing.history.toolbar.import')}
        onClick={() => uploadInput.current?.click()}
      >
        <ForkAwesomeIcon icon='upload'/>
      </Button>
    </div>
  )
}
