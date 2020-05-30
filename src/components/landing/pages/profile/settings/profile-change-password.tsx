import React, { FormEvent, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'

export const ProfileChangePassword: React.FC = () => {
  useTranslation()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordAgain, setNewPasswordAgain] = useState('')

  const updatePasswordSubmit = (event: FormEvent) => {
    // TODO Add profile update feature
    event.preventDefault()
  }

  return (
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
              value={oldPassword}
              onChange={(event) => setOldPassword(event.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="newPassword">
            <Form.Label><Trans i18nKey="newPassword"/></Form.Label>
            <Form.Control
              type="password"
              size="sm"
              className="bg-dark text-white"
              required
              value={newPassword}
            />
          </Form.Group>
          <Form.Group controlId="newPasswordAgain">
            <Form.Label><Trans i18nKey="newPasswordAgain"/></Form.Label>
            <Form.Control
              type="password"
              size="sm"
              className="bg-dark text-white"
              required
              value={newPasswordAgain}
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
  )
}
