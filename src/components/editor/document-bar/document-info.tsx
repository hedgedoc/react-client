import moment from 'moment'
import React, { Fragment, useState } from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import { Trans } from 'react-i18next'
import { ForkAwesomeIcon } from '../../common/fork-awesome/fork-awesome-icon'
import { DocumentTime } from './document-time'
import { CommonModal } from '../../common/modals/common-modal'

export const DocumentInfo: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  return (
    <Fragment>
      <Button variant={'light'} className={'mx-1'} size={'sm'} onClick={() => setShowModal(true)}>
        <ForkAwesomeIcon icon={'info'} className={'mx-1'}/>
        <Trans i18nKey={'editor.modal.documentInfo.title'}/>
      </Button>
      <CommonModal
        show={showModal}
        onHide={() => setShowModal(false)}
        closeButton={true}
        titleI18nKey={'editor.modal.documentInfo.title'}>
        <ListGroup>
          <ListGroup.Item>
            <DocumentTime
              createIcon={true}
              dateTime={moment(Date.now()).subtract(11, 'minutes').toDate()}
              name={'Philip Molares'}
              photo={'https://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=200&r=pg&d=mp'}/>
          </ListGroup.Item>
          <ListGroup.Item>
            <DocumentTime
              createIcon={false}
              dateTime={moment(Date.now()).subtract(3, 'minutes').toDate()}
              name={'Tilman Vatteroth'}
              photo={'https://1.gravatar.com/avatar/767fc9c115a1b989744c755db47feb60?s=200&r=pg&d=mp'}
            />
          </ListGroup.Item>
        </ListGroup>
      </CommonModal>
    </Fragment>
  )
}
