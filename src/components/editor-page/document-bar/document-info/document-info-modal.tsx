/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { DateTime } from 'luxon'
import React from 'react'
import { ListGroup, Modal } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { CommonModal } from '../../../common/modals/common-modal'
import { DocumentInfoLine } from './document-info-line'
import { DocumentInfoLineWithTimeMode, DocumentInfoTimeLine } from './document-info-time-line'
import { UnitalicBoldText } from './unitalic-bold-text'
import { useCustomizeAssetsUrl } from '../../../../hooks/common/use-customize-assets-url'
import { DocumentInfoLineWordCount } from './document-info-line-word-count'
import { cypressId } from '../../../../utils/cypress-attribute'

export interface DocumentInfoModalProps {
  show: boolean
  onHide: () => void
}

export const DocumentInfoModal: React.FC<DocumentInfoModalProps> = ({ show, onHide }) => {
  const assetsBaseUrl = useCustomizeAssetsUrl()
  useTranslation()

  // TODO Replace hardcoded mock data with real/mock API requests
  return (
    <CommonModal
      show={show}
      onHide={onHide}
      closeButton={true}
      titleI18nKey={'editor.modal.documentInfo.title'}
      {...cypressId('document-info-modal')}>
      <Modal.Body>
        <ListGroup>
          <ListGroup.Item>
            <DocumentInfoTimeLine
              size={'2x'}
              mode={DocumentInfoLineWithTimeMode.CREATED}
              time={DateTime.local().minus({ days: 11 })}
              userName={'Tilman'}
              profileImageSrc={`${assetsBaseUrl}img/avatar.png`}
            />
          </ListGroup.Item>
          <ListGroup.Item>
            <DocumentInfoTimeLine
              size={'2x'}
              mode={DocumentInfoLineWithTimeMode.EDITED}
              time={DateTime.local().minus({ minutes: 3 })}
              userName={'Philip'}
              profileImageSrc={`${assetsBaseUrl}img/avatar.png`}
            />
          </ListGroup.Item>
          <ListGroup.Item>
            <DocumentInfoLine icon={'users'} size={'2x'}>
              <Trans i18nKey='editor.modal.documentInfo.usersContributed'>
                <UnitalicBoldText text={'42'} />
              </Trans>
            </DocumentInfoLine>
          </ListGroup.Item>
          <ListGroup.Item>
            <DocumentInfoLine icon={'history'} size={'2x'}>
              <Trans i18nKey='editor.modal.documentInfo.revisions'>
                <UnitalicBoldText text={'192'} />
              </Trans>
            </DocumentInfoLine>
          </ListGroup.Item>
          <ListGroup.Item>
            <DocumentInfoLineWordCount />
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
    </CommonModal>
  )
}
