/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { ChangeEvent, FormEvent } from 'react'
import React, { useCallback, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { doOpenIdLogin } from '../../../api/auth/openid'
import { fetchAndSetUser } from './utils'
import { AuthError } from './auth-error/auth-error'
import { AuthError as AuthErrorType } from '../../../api/auth/index'
import { OpenidField } from './fields/openid-field'

/**
 * Renders the OpenID login box with the OpenID URL field.
 */
export const ViaOpenId: React.FC = () => {
  useTranslation()
  const [openId, setOpenId] = useState('')
  const [error, setError] = useState<AuthErrorType>()

  const onOpenidChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setOpenId(event.target.value)
  }, [])

  const onLogin = useCallback(
    (event: FormEvent) => {
      doOpenIdLogin(openId)
        .then(() => {
          return fetchAndSetUser()
        })
        .catch(() => setError(AuthErrorType.OPENID_ERROR))
      event.preventDefault()
    },
    [openId]
  )

  return (
    <Card className='bg-dark mb-4'>
      <Card.Body>
        <Card.Title>
          <Trans i18nKey='login.signInVia' values={{ service: 'OpenID' }} />
        </Card.Title>

        <Form onSubmit={onLogin}>
          <OpenidField onChange={onOpenidChange} invalid={!!error} />
          <AuthError error={error} />

          <Button type='submit' variant='primary'>
            <Trans i18nKey='login.signIn' />
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}
