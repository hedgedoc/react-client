import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment, useRef, useState } from 'react'
import { Trans } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Modal, Button, Col, Row, Tooltip, OverlayTrigger, InputGroup, FormControl, Overlay } from 'react-bootstrap'
import { IconButton } from '../../../icon-button/icon-button'
import { VersionInputField } from './version-input-field'

export const VersionInfo: React.FC = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <Fragment>
      <Link to={'#'} className={'text-light'} onClick={handleShow}><Trans i18nKey={'versionInfo'}/></Link>
      <Modal show={show} onHide={handleClose} animation={true} >
        <Modal.Body className="text-dark">
          <h3>You are using</h3>
          <Row>
            <Col md={6} className={'flex-column'}>
              <h5>Server version</h5>
              <VersionInputField version={'1.2.3'}/>
              <Row className={'justify-content-center'}>
                <Button size={'sm'} className={'mb-1 mr-1'}>
                  Source code
                </Button>
                <Button size={'sm'} className={'mb-1 mr-1'}>
                  Issue tracker
                </Button>
              </Row>
            </Col>
            <Col md={6}>
              <h5>Client version</h5>
              <VersionInputField version={'1.2.3'}/>
              <Row className={'justify-content-center'}>
                <Button size={'sm'} className={'mb-1 mr-1'}>
                  Source code
                </Button>
                <Button size={'sm'} className={'mb-1 mr-1'}>
                  Issue tracker
                </Button>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}
