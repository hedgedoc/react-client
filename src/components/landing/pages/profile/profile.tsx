import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FormEvent } from 'react'
import { Row, Button, Form, Card, Col } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { ApplicationState } from '../../../../redux'
import { LoginStatus } from '../../../../redux/user/types'

export const Profile: React.FC = () => {
  const { t } = useTranslation()
  const user = useSelector((state: ApplicationState) => state.user)
  const updateProfileSubmit = (event: FormEvent) => {
    // TODO Add profile update feature
    event.preventDefault()
  }
  const updatePasswordSubmit = (event: FormEvent) => {
    // TODO Add password update feature
    event.preventDefault()
  }

  if (user.status === LoginStatus.forbidden) {
    return (
      <Redirect to={'/login'} />
    )
  }

  return (
    <div className="my-3">
      <Row className="h-100 flex justify-content-center">
        <Col lg={6}>
          <Card className="bg-dark mb-4">
            <Card.Body>
              <Card.Title>
                <Trans i18nKey="userProfile"/>
              </Card.Title>
              <Form onSubmit={updateProfileSubmit} className="text-left">
                <Form.Group controlId="userName">
                  <Form.Label><Trans i18nKey="displayName"/></Form.Label>
                  <Form.Control
                    type="text"
                    size="sm"
                    placeholder={t('displayName')}
                    defaultValue={user.name}
                    className="bg-dark text-white"
                    required
                  />
                  <Form.Text><Trans i18nKey="displayNameInfo"/></Form.Text>
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary">
                  <Trans i18nKey="save"/>
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <Card className="bg-dark mb-4">
            <Card.Body>
              <Card.Title><Trans i18nKey="changePassword"/></Card.Title>
              <Form onSubmit={updatePasswordSubmit} className="text-left">
                <Form.Group controlId="oldPassword">
                  <Form.Label><Trans i18nKey="oldPassword"/></Form.Label>
                  <Form.Control
                    type="password"
                    size="sm"
                    className="bg-dark text-white"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="newPassword">
                  <Form.Label><Trans i18nKey="newPassword"/></Form.Label>
                  <Form.Control
                    type="password"
                    size="sm"
                    className="bg-dark text-white"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="newPasswordAgain">
                  <Form.Label><Trans i18nKey="newPasswordAgain"/></Form.Label>
                  <Form.Control
                    type="password"
                    size="sm"
                    className="bg-dark text-white"
                    required
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary">
                  <Trans i18nKey="save"/>
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <Card className="bg-dark mb-4">
            <Card.Body>
              <Card.Title><Trans i18nKey="advancedAccountOptions"/></Card.Title>
              <Button variant="secondary" block>
                <FontAwesomeIcon icon="cloud-download-alt" fixedWidth={true} className="mr-2" />
                <Trans i18nKey="exportAccountData"/>
              </Button>
              <Button variant="danger" block>
                <FontAwesomeIcon icon="trash" fixedWidth={true} className="mr-2" />
                <Trans i18nKey="deleteAccount"/>
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
