import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { doPasswordChange } from '../../../../../api/user'

export const ProfileChangePassword: React.FC = () => {
  useTranslation()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordAgain, setNewPasswordAgain] = useState('')
  const [newPasswordValid, setNewPasswordValid] = useState(false)
  const [newPasswordAgainValid, setNewPasswordAgainValid] = useState(false)

  const onChangeNewPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value)
    setNewPasswordValid(/^[^\s].{5,}$/.test(event.target.value))
    setNewPasswordAgainValid(event.target.value === newPasswordAgain)
  }

  const onChangeNewPasswordAgain = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPasswordAgain(event.target.value)
    setNewPasswordAgainValid(event.target.value === newPassword)
  }

  const updatePasswordSubmit = async (event: FormEvent) => {
    await doPasswordChange(newPassword)
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
              onChange={onChangeNewPassword}
              isValid={newPasswordValid}
            />
            <Form.Text><Trans i18nKey="newPasswordText"/></Form.Text>
          </Form.Group>
          <Form.Group controlId="newPasswordAgain">
            <Form.Label><Trans i18nKey="newPasswordAgain"/></Form.Label>
            <Form.Control
              type="password"
              size="sm"
              className="bg-dark text-white"
              required
              value={newPasswordAgain}
              onChange={onChangeNewPasswordAgain}
              isValid={newPasswordAgainValid}
              isInvalid={newPasswordAgain !== '' && !newPasswordAgainValid}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            disabled={!newPasswordValid || !newPasswordAgainValid}>
            <Trans i18nKey="save"/>
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}
