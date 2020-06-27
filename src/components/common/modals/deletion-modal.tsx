import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { CommonModal, CommonModalProps } from './common-modal'

export interface DeletionModalProps extends CommonModalProps {
  onDelete: () => void
  deletionButtonText: string
}

export const DeletionModal: React.FC<DeletionModalProps> = ({ show, onHide, title, onDelete, deletionButtonText, icon, children }) => {
  useTranslation()

  return (
    <CommonModal show={show} onHide={onHide} title={title} icon={icon} closeButton={true}>
      <Modal.Body className="text-dark">
        { children }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onDelete}>
          <Trans i18nKey={deletionButtonText}/>
        </Button>
      </Modal.Footer>
    </CommonModal>
  )
}
