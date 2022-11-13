/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Col, Row } from 'react-bootstrap'
import { HedgeDocLogoType, HedgeDocLogoWithText } from '../common/hedge-doc-logo/hedge-doc-logo-with-text'
import { IntroCustomContent } from '../intro-page/intro-custom-content'
import { EditorToRendererCommunicatorContextProvider } from '../editor-page/render-context/editor-to-renderer-communicator-context-provider'
import { Branding } from '../common/branding/branding'
import { Trans, useTranslation } from 'react-i18next'
import { ViaLocal } from './auth/via-local'
import { ViaGuest } from './auth/via-guest'
import styles from './style.module.scss'
import { ShowIf } from '../common/show-if/show-if'
import React, { useMemo } from 'react'
import { useApplicationState } from '../../hooks/common/use-application-state'
import { LegalMenuButton } from '../legal-menu-button/legal-menu-button'
import type { AuthProviderWithCustomName } from '../../api/config/types'
import { AuthProviderType, authProviderTypeOneClick } from '../../api/config/types'
import { ViaLdap } from './auth/via-ldap'
import { SettingsButton } from '../layout/settings-dialog/settings-button'
import { ViaOneClick } from './auth/one-click/via-one-click'

export const LoginPageContent: React.FC = () => {
  useTranslation()
  const authProviders = useApplicationState((state) => state.config.authProviders)

  const oneClickProviders = useMemo(() => {
    return authProviders
      .filter((provider) => authProviderTypeOneClick.includes(provider.type))
      .map((provider, index) => <ViaOneClick provider={provider} key={index} />)
  }, [authProviders])

  const ldapProviders = useMemo(() => {
    return authProviders
      .filter((provider) => provider.type === AuthProviderType.LDAP)
      .map((provider) => {
        const ldapProvider = provider as AuthProviderWithCustomName
        return (
          <ViaLdap
            providerName={ldapProvider.providerName}
            identifier={ldapProvider.identifier}
            key={ldapProvider.identifier}
          />
        )
      })
  }, [authProviders])

  return (
    <Row className={'m-0'}>
      <Col md={7} className={'mvh-100 p-5'}>
        <EditorToRendererCommunicatorContextProvider>
          <div className={`d-flex flex-column align-items-center mt-3 ${styles['intro-pane']}`}>
            <h1 dir='auto' className={'align-items-center d-flex justify-content-center flex-column'}>
              <HedgeDocLogoWithText logoType={HedgeDocLogoType.COLOR_HORIZONTAL} size={150} />
            </h1>
            <div className={'mb-5'}>
              <Branding delimiter={false} />
            </div>
            <IntroCustomContent />
          </div>
        </EditorToRendererCommunicatorContextProvider>
      </Col>
      <Col className={'bg-secondary mvh-100 p-5'} md={5}>
        <div className={`d-flex flex-column gap-5 ${styles['login-pane']}`}>
          <div className={'d-flex flex-row-reverse gap-2'}>
            <LegalMenuButton />
            <SettingsButton variant={'outline-light'} />
          </div>
          <ViaLocal />
          <ShowIf condition={ldapProviders.length > 0}>{ldapProviders}</ShowIf>
          <ShowIf condition={oneClickProviders.length > 0}>
            <div>
              <h5>
                <Trans i18nKey='login.signInVia' values={{ service: '' }} />
              </h5>
              <div className={'d-flex flex-wrap flex-row gap-3'}>{oneClickProviders}</div>
            </div>
          </ShowIf>
          <ViaGuest />
        </div>
      </Col>
    </Row>
  )
}
