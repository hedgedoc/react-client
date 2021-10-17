/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { CommonModal } from '../../common/modals/common-modal'
import { dataCy } from '../../../utils/cypress-attribute'

export interface MaxLengthWarningModalProps {
  show: boolean
  onHide: () => void
  maxLength: number
}

export const MaxLengthWarningModal: React.FC<MaxLengthWarningModalProps> = ({ show, onHide, maxLength }) => {
  useTranslation()

  return (
    <CommonModal
      {...dataCy('limitReachedModal')}
      show={show}
      onHide={onHide}
      titleI18nKey={'editor.error.limitReached.title'}
      closeButton={true}>
      <Modal.Body>
        <Trans i18nKey={'editor.error.limitReached.description'} values={{ maxLength }} />
        <strong className='mt-2 d-block'>
          <Trans i18nKey={'editor.error.limitReached.advice'} />
        </strong>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>
          <Trans i18nKey={'common.close'} />
        </Button>
      </Modal.Footer>
    </CommonModal>
  )
}
