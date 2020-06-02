import React, { useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../../../../fork-awesome/fork-awesome-icon'
import { HistoryEntry } from '../history'

export interface ImportHistoryButtonProps {
  onImportHistory: (entries: HistoryEntry[]) => void
}

export const ImportHistoryButton: React.FC<ImportHistoryButtonProps> = ({ onImportHistory }) => {
  const { t } = useTranslation()
  const uploadInput = useRef<HTMLInputElement>(null)
  const [show, setShow] = useState(false)
  const [fileName, setFilename] = useState('')

  const handleShow = () => setShow(true)

  const handleClose = () => setShow(false)

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { validity, files } = event.target
    if (files && files[0] && validity.valid) {
      const file = files[0]
      setFilename(file.name)
      if (file.type !== 'application/json') {
        handleShow()
        return
      }
      const fileReader = new FileReader()
      fileReader.onload = (event) => {
        if (event.target && event.target.result) {
          try {
            const result = event.target.result as string
            const entries = JSON.parse(result) as HistoryEntry[]
            onImportHistory(entries)
          } catch {
            handleShow()
          }
        }
      }
      fileReader.readAsText(file)
    } else {
      handleShow()
    }
  }

  return (
    <div>
      <input type='file' className="d-none" accept=".json" onChange={handleUpload}
        ref={uploadInput}/>
      <Button variant={'light'}
        title={t('landing.history.toolbar.import')}
        onClick={() => uploadInput.current?.click()}
      >
        <ForkAwesomeIcon icon='upload'/>
      </Button>
      <Modal show={show} onHide={handleClose} animation={true} className="text-dark">
        <Modal.Header closeButton>
          <Modal.Title>
            <ForkAwesomeIcon icon='exclamation-circle'/>&nbsp;<Trans i18nKey={'landing.history.modal.importHistoryError.title'}/>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark text-center">
          {fileName !== ''
            ? <h5><Trans i18nKey={'landing.history.modal.importHistoryError.textWithFile'} values={{ fileName: fileName }}/></h5>
            : <h5><Trans i18nKey={'landing.history.modal.importHistoryError.textWithOutFile'}/></h5>
          }
        </Modal.Body>
      </Modal>
    </div>
  )
}
