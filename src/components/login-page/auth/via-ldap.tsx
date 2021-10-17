/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { FormEvent } from 'react'
import React, { useCallback, useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'

import { Trans, useTranslation } from 'react-i18next'
import { doLdapLogin } from '../../../api/auth'
import { fetchAndSetUser } from './utils'
import { useApplicationState } from '../../../hooks/common/use-application-state'

export const ViaLdap: React.FC = () => {
  const { t } = useTranslation()
  const ldapCustomName = useApplicationState((state) => state.config.customAuthNames.ldap)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const name = ldapCustomName ? `${ldapCustomName} (LDAP)` : 'LDAP'

  const onLoginSubmit = useCallback(
    (event: FormEvent) => {
      doLdapLogin(username, password)
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
          <Trans i18nKey='login.signInVia' values={{ service: name }} />
        </Card.Title>
        <Form onSubmit={onLoginSubmit}>
          <Form.Group controlId='ldap-username'>
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

          <Form.Group controlId='ldap-password'>
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

          <Button type='submit' variant='primary'>
            <Trans i18nKey='login.signIn' />
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}
