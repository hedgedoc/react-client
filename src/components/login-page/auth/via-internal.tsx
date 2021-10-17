/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { FormEvent } from 'react'
import React, { useCallback, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { doInternalLogin } from '../../../api/auth'
import { ShowIf } from '../../common/show-if/show-if'
import { fetchAndSetUser } from './utils'
import { useApplicationState } from '../../../hooks/common/use-application-state'

export const ViaInternal: React.FC = () => {
  const { t } = useTranslation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const allowRegister = useApplicationState((state) => state.config.allowRegister)

  const onLoginSubmit = useCallback(
    (event: FormEvent) => {
      doInternalLogin(username, password)
        .then(() => fetchAndSetUser())
        .catch(() => setError(true))
      event.preventDefault()
    },
    [username, password]
  )

  return (
    <Card className='bg-dark mb-4'>
      <Card.Body>
        <Card.Title>
          <Trans i18nKey='login.signInVia' values={{ service: t('login.auth.username') }} />
        </Card.Title>
        <Form onSubmit={onLoginSubmit}>
          <Form.Group controlId='internal-username'>
            <Form.Control
              isInvalid={error}
              type='text'
              size='sm'
              placeholder={t('login.auth.username')}
              onChange={(event) => setUsername(event.currentTarget.value)}
              className='bg-dark text-light'
              autoComplete='username'
            />
          </Form.Group>

          <Form.Group controlId='internal-password'>
            <Form.Control
              isInvalid={error}
              type='password'
              size='sm'
              placeholder={t('login.auth.password')}
              onChange={(event) => setPassword(event.currentTarget.value)}
              className='bg-dark text-light'
              autoComplete='current-password'
            />
          </Form.Group>

          <Alert className='small' show={error} variant='danger'>
            <Trans i18nKey='login.auth.error.usernamePassword' />
          </Alert>

          <div className='flex flex-row' dir='auto'>
            <Button type='submit' variant='primary' className='mx-2'>
              <Trans i18nKey='login.signIn' />
            </Button>
            <ShowIf condition={allowRegister}>
              <Link to={'/register'}>
                <Button type='button' variant='secondary' className='mx-2'>
                  <Trans i18nKey='login.register.title' />
                </Button>
              </Link>
            </ShowIf>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}
