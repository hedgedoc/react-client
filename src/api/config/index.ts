/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { defaultFetchConfig, expectResponseCode, getApiUrl } from '../utils'
import { ConfigFromBackend } from './types'

export const getConfig = async (): Promise<ConfigFromBackend> => {
  const response = await fetch(getApiUrl() + 'config', {
    ...defaultFetchConfig
  })
  expectResponseCode(response)
  const responseConfig = (await response.json()) as ConfigFromBackend
  return {
    allowAnonymous: responseConfig.allowAnonymous,
    allowRegister: responseConfig.allowRegister,
    authProviders: {
      google: responseConfig.authProviders.google,
      facebook: responseConfig.authProviders.facebook,
      twitter: responseConfig.authProviders.twitter,
      dropbox: responseConfig.authProviders.dropbox,
      gitlab: responseConfig.authProviders.gitlab,
      github: responseConfig.authProviders.github,
      internal: responseConfig.authProviders.internal,
      ldap: responseConfig.authProviders.ldap,
      oauth2: responseConfig.authProviders.oauth2,
      openid: responseConfig.authProviders.openid,
      saml: responseConfig.authProviders.saml
    },
    branding: {
      name: responseConfig.branding.name,
      logo: responseConfig.branding.logo
    },
    customAuthNames: {
      saml: responseConfig.customAuthNames.saml,
      ldap: responseConfig.customAuthNames.ldap,
      oauth2: responseConfig.customAuthNames.oauth2
    },
    maxDocumentLength: responseConfig.maxDocumentLength,
    plantumlServer: responseConfig.plantumlServer,
    specialUrls: {
      privacy: responseConfig.specialUrls.privacy,
      imprint: responseConfig.specialUrls.imprint,
      termsOfUse: responseConfig.specialUrls.termsOfUse
    },
    useImageProxy: responseConfig.useImageProxy,
    version: {
      commit: responseConfig.version.commit,
      major: responseConfig.version.major,
      minor: responseConfig.version.minor,
      patch: responseConfig.version.patch,
      preRelease: responseConfig.version.preRelease
    },
    iframeCommunication: {
      rendererOrigin: responseConfig.iframeCommunication.rendererOrigin,
      editorOrigin: responseConfig.iframeCommunication.editorOrigin
    }
  }
}
