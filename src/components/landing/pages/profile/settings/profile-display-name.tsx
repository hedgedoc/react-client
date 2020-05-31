import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { doDisplayNameUpdate } from '../../../../../api/user'
import { ApplicationState } from '../../../../../redux'
import { getAndSetUser } from '../../../../../utils/apiUtils'

export const ProfileDisplayName: React.FC = () => {
  const { t } = useTranslation()
  const user = useSelector((state: ApplicationState) => state.user)
  const [submittable, setSubmittable] = useState(false)
  const [error, setError] = useState(false)
  const [displayName, setDisplayName] = useState(user.name)

  const changeNameField = (event: ChangeEvent<HTMLInputElement>) => {
    setSubmittable(!/^\s*$/.test(event.target.value))
    setDisplayName(event.target.value)
  }

  const doAsyncChange = async () => {
    await doDisplayNameUpdate(displayName)
    await getAndSetUser()
  }

  const changeNameSubmit = (event: FormEvent) => {
    doAsyncChange().catch(() => setError(true))
    event.preventDefault()
  }

  return (
    <Card className="bg-dark mb-4">
      <Card.Body>
        <Card.Title>
          <Trans i18nKey="userProfile"/>
        </Card.Title>
        <Form onSubmit={changeNameSubmit} className="text-left">
          <Form.Group controlId="displayName">
            <Form.Label><Trans i18nKey="displayName"/></Form.Label>
            <Form.Control
              type="text"
              size="sm"
              placeholder={t('displayName')}
              value={displayName}
              className="bg-dark text-white"
              onChange={changeNameField}
              isValid={submittable}
              isInvalid={error}
              required
            />
            <Form.Text><Trans i18nKey="displayNameInfo"/></Form.Text>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            disabled={!submittable}>
            <Trans i18nKey="save"/>
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}
