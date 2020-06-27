import React from 'react'
import { Modal } from 'react-bootstrap'
import { CommonModal, CommonModalProps } from './common-modal'

export const ErrorModal: React.FC<CommonModalProps> = ({ show, onHide, title, icon, children }) => {
  return (
    <CommonModal show={show} onHide={onHide} title={title} icon={icon} closeButton={true}>
      <Modal.Body className="text-dark text-center">
        { children }
      </Modal.Body>
    </CommonModal>
  )
}
