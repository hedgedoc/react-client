/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { FormEvent } from 'react'
import React, { useCallback, useState } from 'react'
import { Button, Form } from 'react-bootstrap'

import { Trans, useTranslation } from 'react-i18next'
import { doLdapLogin } from '../../../api/auth/ldap'
import { AuthError as AuthErrorType } from '../../../api/auth/types'
import { UsernameField } from './fields/username-field'
import { PasswordField } from './fields/password-field'
import { useOnInputChange } from '../../../hooks/common/use-on-input-change'
import { fetchAndSetUser } from '../../../redux/user/methods'
import { AuthError } from './auth-error/auth-error'

export interface ViaLdapProps {
  providerName: string
  identifier: string
}

/**
 * Renders the LDAP login box with username and password field.
 */
export const ViaLdap: React.FC<ViaLdapProps> = ({ providerName, identifier }) => {
  useTranslation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<AuthErrorType>()

  const onLoginSubmit = useCallback(
    (event: FormEvent) => {
      doLdapLogin(identifier, username, password)
        .then(() => fetchAndSetUser())
        .catch((error: Error) => {
          setError(
            Object.values(AuthErrorType).includes(error.message as AuthErrorType)
              ? (error.message as AuthErrorType)
              : AuthErrorType.OTHER
          )
        })
      event.preventDefault()
    },
    [username, password, identifier]
  )

  const onUsernameChange = useOnInputChange(setUsername)
  const onPasswordChange = useOnInputChange(setPassword)

  return (
    <div className={'d-flex flex-column w-100'}>
      <h5>
        <Trans i18nKey='login.signInVia' values={{ service: providerName }} />
      </h5>
      <Form onSubmit={onLoginSubmit}>
        <UsernameField onChange={onUsernameChange} invalid={!!error} />
        <PasswordField onChange={onPasswordChange} invalid={!!error} />
        <AuthError error={error} />

        <Button type='submit' variant='outline-light'>
          <Trans i18nKey='login.signIn' />
        </Button>
      </Form>
    </div>
  )
}
