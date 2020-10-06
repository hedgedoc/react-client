import { DateTime } from 'luxon'
import React, { ChangeEvent, Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Card, Col, Form, ListGroup, Modal, Row } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { getAccessTokenList } from '../../../api/tokens'
import { AccessToken } from '../../../api/tokens/types'
import { IconButton } from '../../common/icon-button/icon-button'
import { CommonModal } from '../../common/modals/common-modal'
import { DeletionModal } from '../../common/modals/deletion-modal'
import { ShowIf } from '../../common/show-if/show-if'

export const ProfileAccessTokens: React.FC = () => {
  const { t } = useTranslation()

  const [error, setError] = useState(false)
  const [showAddedModal, setShowAddedModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [accessTokens, setAccessTokens] = useState<AccessToken[]>([])
  const [newTokenLabel, setNewTokenLabel] = useState('')

  const addToken = useCallback(() => {
    // TODO Handle logic for adding an access token
  }, [])

  const deleteToken = useCallback(() => {
    // TODO Handle logic for removing an existing access token
  }, [])

  const newTokenSubmittable = useMemo(() => {
    return newTokenLabel.trim().length > 0
  }, [newTokenLabel])

  useEffect(() => {
    getAccessTokenList()
      .then(tokens => {
        setError(false)
        setAccessTokens(tokens)
      })
      .catch(err => {
        console.error(err)
        setError(true)
      })
  }, [])

  return (
    <Fragment>
      <Card className='bg-dark mb-4'>
        <Card.Body>
          <Card.Title>
            <Trans i18nKey='profile.accessTokens.title'/>
          </Card.Title>
          <p className='text-start'><Trans i18nKey='profile.accessTokens.info'/></p>
          <p className='text-start small'><Trans i18nKey='profile.accessTokens.infoDev'/></p>
          <hr/>
          <ShowIf condition={accessTokens.length === 0 && !error}>
            <Trans i18nKey='profile.accessTokens.noTokens'/>
          </ShowIf>
          <ShowIf condition={error}>
            <Trans i18nKey='common.errorOccurred'/>
          </ShowIf>
          <ListGroup>
            {
              accessTokens.map((token, index) => {
                return (
                  <ListGroup.Item className='bg-dark' key={index}>
                    <Row>
                      <Col className='text-start'>
                        { token.label }
                      </Col>
                      <Col className='text-start text-white-50'>
                        <Trans i18nKey='profile.accessTokens.created' values={{
                          time: DateTime.fromSeconds(token.created).toRelative({
                            style: 'short'
                          })
                        }}/>
                      </Col>
                      <Col xs='auto'>
                        <IconButton icon='trash-o' variant='danger'/>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )
              })
            }
          </ListGroup>
          <hr/>
          <Form onSubmit={addToken} className='text-left'>
            <Form.Row>
              <Col>
                <Form.Control
                  type='text'
                  size='sm'
                  placeholder={t('profile.accessTokens.label')}
                  value={newTokenLabel}
                  className='bg-dark text-light'
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setNewTokenLabel(event.target.value)}
                  isValid={newTokenSubmittable}
                  required
                />
              </Col>
              <Col xs={'auto'}>
                <Button
                  type='submit'
                  variant='primary'
                  size='sm'
                  disabled={!newTokenSubmittable}>
                  <Trans i18nKey='profile.accessTokens.createToken'/>
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Card.Body>
      </Card>

      <CommonModal show={showAddedModal} onHide={() => setShowAddedModal(false)} titleI18nKey='profile.modals.addAccessToken.title'>
        <Modal.Body>
          1
        </Modal.Body>
        <Modal.Footer>
          2
        </Modal.Footer>
      </CommonModal>

      <DeletionModal onConfirm={deleteToken} deletionButtonI18nKey={''} show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        1
      </DeletionModal>
    </Fragment>
  )
}
