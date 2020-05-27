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

  // TODO General: Add translations
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
                  <Form.Label>Display name</Form.Label>
                  <Form.Control
                    type="text"
                    size="sm"
                    placeholder={t('displayName')}
                    defaultValue={user.name}
                    className="bg-dark text-white"
                    required
                  />
                  <Form.Text>This name will be shown publicly on notes you created or edited.</Form.Text>
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
              <Card.Title>Change password</Card.Title>
              <Form onSubmit={updatePasswordSubmit} className="text-left">
                <Form.Group controlId="oldPassword">
                  <Form.Label>Old password</Form.Label>
                  <Form.Control
                    type="password"
                    size="sm"
                    className="bg-dark text-white"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="newPassword">
                  <Form.Label>New password</Form.Label>
                  <Form.Control
                    type="password"
                    size="sm"
                    className="bg-dark text-white"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="newPasswordAgain">
                  <Form.Label>New password again</Form.Label>
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
              <Card.Title>Export data and delete account</Card.Title>
              <Button variant="secondary" block>
                <FontAwesomeIcon icon="cloud-download-alt" fixedWidth={true} className="mr-2" />
                <span>Export all my data</span>
              </Button>
              <Button variant="danger" block>
                <FontAwesomeIcon icon="trash" fixedWidth={true} className="mr-2" />
                <span>Delete my account</span>
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
