/*
SPDX-FileCopyrightText: 2020 The HedgeDoc developers (see AUTHORS file)

SPDX-License-Identifier: AGPL-3.0-only
*/

import React, { useCallback } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Trans } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../redux'
import { CommonModal } from '../modals/common-modal'

export const ReloadAppModal: React.FC = () => {
  const showReloadAppModal = useSelector((state: ApplicationState) => state.notifications.reloadApp)

  const reloadApp = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <CommonModal titleI18nKey={'global.modal.reloadApp.title'} show={showReloadAppModal}>
      <Modal.Body className="text-dark">
        <Trans i18nKey={'global.modal.reloadApp.content'}/>
      </Modal.Body>
      <Modal.Footer>
        <Button variant={'danger'} onClick={reloadApp}>
          <Trans i18nKey={'global.modal.reloadApp.reloadButton'}/>
        </Button>
      </Modal.Footer>
    </CommonModal>
  )
}
