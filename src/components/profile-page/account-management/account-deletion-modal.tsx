/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback } from 'react'
import type { CommonModalProps } from '../../common/modals/common-modal'
import { CommonModal } from '../../common/modals/common-modal'
import { Trans, useTranslation } from 'react-i18next'
import { Button, Modal } from 'react-bootstrap'
import { CountdownButton } from '../../common/countdown-button/countdown-button'
import { deleteUser } from '../../../api/me'
import { clearUser } from '../../../redux/user/methods'
import { dispatchUiNotification, showErrorNotification } from '../../../redux/ui-notifications/methods'

/**
 * Confirmation modal for deleting your account.
 */
export const AccountDeletionModal: React.FC<Pick<CommonModalProps, 'show' | 'onHide'>> = ({ show, onHide }) => {
  useTranslation()

  const deleteUserAccount = useCallback(() => {
    deleteUser()
      .then(() => {
        clearUser()
        return dispatchUiNotification(
          'profile.modal.deleteUser.notificationTitle',
          'profile.modal.deleteUser.notificationText',
          {}
        )
      })
      .catch(showErrorNotification('profile.modal.deleteUser.failed'))
      .finally(() => {
        if (onHide) {
          onHide()
        }
      })
  }, [onHide])

  return (
    <CommonModal show={show} titleI18nKey={'profile.modal.deleteUser.message'} onHide={onHide} closeButton={true}>
      <Modal.Body>
        <Trans i18nKey='profile.modal.deleteUser.subMessage' />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          <Trans i18nKey='common.close' />
        </Button>
        <CountdownButton variant='danger' onClick={deleteUserAccount} countdownSeconds={10}>
          <Trans i18nKey={'profile.modal.deleteUser.title'} />
        </CountdownButton>
      </Modal.Footer>
    </CommonModal>
  )
}
