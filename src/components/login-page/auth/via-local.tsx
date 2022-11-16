/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { FormEvent } from 'react'
import React, { useCallback, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Button, Form } from 'react-bootstrap'
import { ShowIf } from '../../common/show-if/show-if'
import Link from 'next/link'
import { AuthError as AuthErrorType } from '../../../api/auth/types'
import { useApplicationState } from '../../../hooks/common/use-application-state'
import { doLocalLogin } from '../../../api/auth/local'
import { useOnInputChange } from '../../../hooks/common/use-on-input-change'
import { UsernameField } from './fields/username-field'
import { PasswordField } from './fields/password-field'
import { AuthError } from './auth-error/auth-error'
import { fetchAndSetUser } from '../../../redux/user/methods'
import { useDarkModeState } from '../../../hooks/common/use-dark-mode-state'

export const ViaLocal: React.FC = () => {
  const { t } = useTranslation()
  const darkModeState = useDarkModeState()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<AuthErrorType>()
  const allowRegister = useApplicationState((state) => state.config.allowRegister)

  const onLoginSubmit = useCallback(
    (event: FormEvent) => {
      doLocalLogin(username, password)
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
    [username, password]
  )

  const onUsernameChange = useOnInputChange(setUsername)
  const onPasswordChange = useOnInputChange(setPassword)

  return (
    <div className={'d-flex flex-column w-100'}>
      <h5>
        <Trans i18nKey='login.signInVia' values={{ service: t('login.auth.username') }} />
      </h5>
      <Form onSubmit={onLoginSubmit}>
        <UsernameField onChange={onUsernameChange} invalid={!!error} />
        <PasswordField onChange={onPasswordChange} invalid={!!error} />
        <AuthError error={error} />

        <div className='d-flex flex-row justify-content-between' dir='auto'>
          <div>
            <Button type='submit' variant={'primary'}>
              <Trans i18nKey='login.signIn' />
            </Button>
          </div>
          <ShowIf condition={allowRegister}>
            <div className={'d-inline-block text-end'}>
              <Trans i18nKey={'login.register.intro'} />
              <br />
              <Link href={'/register'} passHref={true}>
                <a>
                  <Trans i18nKey='login.register.title' />
                </a>
              </Link>
            </div>
          </ShowIf>
        </div>
      </Form>
    </div>
  )
}
