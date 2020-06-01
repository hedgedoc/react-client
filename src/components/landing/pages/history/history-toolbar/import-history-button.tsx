import React, { useState } from 'react'
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
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>()

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { validity, files } = event.target
    if (files && files[0] && validity.valid) {
      const file = files[0]
      const fileReader = new FileReader()
      fileReader.onload = (event) => {
        if (event.target && event.target.result) {
          const result = event.target.result as string
          onImportHistory(
            JSON.parse(result) as HistoryEntry[]
          )
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
        ref={element => setInputRef(element)}/>
      <Button variant={'light'}
        title={t('landing.history.toolbar.import')}
        onClick={() => inputRef?.click()}
      >
        <ForkAwesomeIcon icon='upload'/>
      </Button>
    </div>
  )
}
