import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment, useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { deleteUser } from '../../../../../api/user'
import { clearUser } from '../../../../../redux/user/methods'
import { getBackendUrl } from '../../../../../utils/apiUtils'

export const ProfileAccountManagement: React.FC = () => {
  const { t } = useTranslation()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deletionButtonText, setDeletionButtonText] = useState('')
  const [deletionButtonActive, setDeletionButtonActive] = useState(false)
  const [countdown, setCountdown] = useState(10)

  const handleModalClose = () => {
    setShowDeleteModal(false)
  }

  const doCountdown = () => {
    if (!showDeleteModal) {
      return
    }
    if (countdown === 0) {
      setDeletionButtonText(t('profile.modal.deleteUser.title'))
      setDeletionButtonActive(true)
    } else {
      setDeletionButtonText(countdown.toString())
      setCountdown(countdown - 1)
      setTimeout(() => doCountdown(), 1000)
    }
  }

  const handleModalOpen = () => {
    setShowDeleteModal(true)
    setDeletionButtonActive(false)
    setCountdown(10)
    doCountdown()
  }

  const deleteUserAccount = async () => {
    await deleteUser()
    clearUser()
  }

  return (
    <Fragment>
      <Card className="bg-dark mb-4">
        <Card.Body>
          <Card.Title><Trans i18nKey="profile.accountManagement"/></Card.Title>
          <Button variant="secondary" block href={getBackendUrl() + '/me/export'} className="mb-2">
            <FontAwesomeIcon icon="cloud-download-alt" fixedWidth={true} className="mr-2" />
            <Trans i18nKey="profile.exportUserData"/>
          </Button>
          <Button variant="danger" block onClick={handleModalOpen}>
            <FontAwesomeIcon icon="trash" fixedWidth={true} className="mr-2" />
            <Trans i18nKey="profile.deleteUser"/>
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showDeleteModal} onHide={handleModalClose} animation={true}>
        <Modal.Body className="text-dark">
          <h3><Trans i18nKey="profile.modal.deleteUser.message"/></h3>
          <Trans i18nKey="profile.modal.deleteUser.subMessage"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            <Trans i18nKey="common.close"/>
          </Button>
          <Button variant="danger" onClick={deleteUserAccount} disabled={!deletionButtonActive}>
            {deletionButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}
