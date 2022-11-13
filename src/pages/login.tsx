/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { LoginPageContent } from '../components/login-page/login-page-content'
import { MotdModal } from '../components/common/motd-modal/motd-modal'
import React, { Fragment } from 'react'
import { useApplicationState } from '../hooks/common/use-application-state'
import { useApplyDarkMode } from '../hooks/common/use-apply-dark-mode'
import { RedirectBack } from '../components/common/redirect-back'

export const Login: React.FC = () => {
  useApplyDarkMode()

  const userLoggedIn = useApplicationState((state) => !!state.user)

  if (userLoggedIn) {
    return <RedirectBack />
  }

  return (
    <Fragment>
      <MotdModal />
      <LoginPageContent />
    </Fragment>
  )
}

export default Login
