import React, { Fragment, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { Trans } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ApplicationState } from '../../../../redux'
import frontendVersion from '../../../../version.json'
import { VersionInputField } from './version-input-field'

export const VersionInfo: React.FC = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const serverVersion = useSelector((state:ApplicationState) => state.backendConfig.version)

  const column = (title: string, version: string, sourceCodeLink: string, issueTrackerLink: string) => (
    <Col md={6} className={'flex-column'}>
      <h5>{title}</h5>
      <VersionInputField version={version}/>
      <Row className={'justify-content-center'}>
        <Button href={sourceCodeLink} size={'sm'} className={'mb-1 mr-1'}>
          Source code
        </Button>
        <Button href={issueTrackerLink} size={'sm'} className={'mb-1 mr-1'}>
          Issue tracker
        </Button>
      </Row>
    </Col>
  )

  return (
    <Fragment>
      <Link to={'#'} className={'text-light'} onClick={handleShow}><Trans i18nKey={'versionInfo'}/></Link>
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Body className="text-dark">
          <h3>You are using</h3>
          <Row>
            {column('Server version', serverVersion.version, serverVersion.sourceCodeUrl, serverVersion.issueTrackerUrl)}
            {column('Client version', frontendVersion.version, frontendVersion.sourceCodeUrl, frontendVersion.issueTrackerUrl)}
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
