/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import equal from 'fast-deep-equal'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ButtonProps } from 'react-bootstrap/Button'
import { Trans, useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { ApplicationState } from '../../../redux'
import { ShowIf } from '../../common/show-if/show-if'

export type SignInButtonProps = Omit<ButtonProps, 'href'>

const INTERACTIVE_LOGIN_METHODS = ['internal', 'ldap', 'openid']

export const SignInButton: React.FC<SignInButtonProps> = ({ variant, ...props }) => {
  const { t } = useTranslation()
  const authProviders = useSelector((state: ApplicationState) => state.config.authProviders, equal)
  const [loginLink, setLoginLink] = useState('/login')

  useEffect(() => {
    const activeProviders = Object.entries(authProviders)
                                  .filter(entry => entry[1] === true)
                                  .map(entry => entry[0])
    const activeOneClickProviders = activeProviders.filter(entry => !INTERACTIVE_LOGIN_METHODS.includes(entry))

    if (activeProviders.length === 1 && activeOneClickProviders.length === 1) {
      setLoginLink(`/api/v2/auth/${activeOneClickProviders[0]}`)
    }
  }, [authProviders, setLoginLink])

  return (
    <ShowIf condition={ Object.values(authProviders).includes(true) }>
      <LinkContainer to={ loginLink } title={ t('login.signIn') }>
        <Button
          data-cy={ 'sign-in-button' }
          variant={ variant || 'success' }
          { ...props }>
          <Trans i18nKey="login.signIn"/>
        </Button>
      </LinkContainer>
    </ShowIf>
  )
}
