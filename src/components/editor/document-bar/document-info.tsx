import moment from 'moment'
import React, { Fragment, useState } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { CommonModal } from '../../common/modals/common-modal'
import { DocumentInfoLine } from './document-info-line'
import { DocumentInfoLineWithTimeMode, DocumentInfoTimeLine } from './document-info-time-line'

export const DocumentInfo: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  useTranslation()

  return (
    <Fragment>
      <Button variant={'light'} className={'mx-1'} size={'sm'} onClick={() => setShowModal(true)}>
        <ForkAwesomeIcon icon={'line-chart'} className={'mx-1'}/>
        <Trans i18nKey={'editor.modal.documentInfo.title'}/>
      </Button>
      <CommonModal
        show={showModal}
        onHide={() => setShowModal(false)}
        closeButton={true}
        titleI18nKey={'editor.modal.documentInfo.title'}>
        <ListGroup>
          <ListGroup.Item>
            <DocumentInfoTimeLine mode={DocumentInfoLineWithTimeMode.CREATED} time={ moment().subtract(11, 'minutes') } userName={'Tilman'}/>
          </ListGroup.Item>
          <ListGroup.Item>
            <DocumentInfoTimeLine mode={DocumentInfoLineWithTimeMode.EDITED} time={ moment().subtract(3, 'minutes') } userName={'Philip'}/>
          </ListGroup.Item>
          <ListGroup.Item>
            <DocumentInfoLine icon={'users'}>
              6172 Users contributed to this document
            </DocumentInfoLine>
          </ListGroup.Item>
        </ListGroup>
      </CommonModal>
    </Fragment>
  )
}
