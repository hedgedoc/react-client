import React, { FormEvent, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { doEmailLogin, doEmailRegister } from '../../../../../api/auth'
import { getAndSetUser } from '../../../../../utils/apiUtils'

enum EmailError {
  NONE,
  LOGIN,
  REGISTER
}

export const ViaEMail: React.FC = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(EmailError.NONE)

  const doAsyncLogin = async () => {
    await doEmailLogin(email, password)
    await getAndSetUser()
  }

  const doAsyncRegister = async () => {
    await doEmailRegister(email, password)
    await getAndSetUser()
  }

  const onFormSubmit = (event: FormEvent) => {
    doAsyncLogin().catch(() => setError(EmailError.LOGIN))
    event.preventDefault()
  }

  const onRegisterClick = () => {
    doAsyncRegister().catch(() => setError(EmailError.REGISTER))
  }

  return (
    <Card className="bg-dark mb-4">
      <Card.Body>
        <Card.Title>
          <Trans i18nKey="login.signInVia" values={{ service: 'E-Mail' }}/>
        </Card.Title>
        <Form onSubmit={onFormSubmit}>
          <Form.Group controlId="email">
            <Form.Control
              isInvalid={error !== EmailError.NONE}
              type="email"
              size="sm"
              placeholder={t('login.auth.email')}
              onChange={(event) => setEmail(event.currentTarget.value)} className="bg-dark text-white"
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Control
              isInvalid={error !== EmailError.NONE}
              type="password"
              size="sm"
              placeholder={t('login.auth.password')}
              onChange={(event) => setPassword(event.currentTarget.value)}
              className="bg-dark text-white"/>
          </Form.Group>

          <Alert className="small" show={error === EmailError.LOGIN} variant="danger">
            <Trans i18nKey="login.auth.error.emailLogin"/>
          </Alert>

          <Alert className="small" show={error === EmailError.REGISTER} variant="danger">
            <Trans i18nKey="login.auth.error.emailRegister"/>
          </Alert>

          <div className='flex flex-row email-buttons'>
            <Button
              type="submit"
              variant="primary"
              className='mx-2'>
              <Trans i18nKey="login.signIn"/>
            </Button>
            <Button
              type='button'
              variant='secondary'
              className='mx-2'
              onClick={onRegisterClick}>
              <Trans i18nKey='login.register'/>
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}
