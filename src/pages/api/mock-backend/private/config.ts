/*
 * SPDX-FileCopyrightText: 2022 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Config } from '../../../../api/config/types'
import { AuthProviderType } from '../../../../api/config/types'
import {
  HttpMethod,
  respondMethodNotAllowed,
  respondToMatchingRequest
} from '../../../../handler-utils/respond-to-matching-request'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  respondToMatchingRequest<Config>(HttpMethod.GET, req, res, {
    allowAnonymous: true,
    allowRegister: true,
    authProviders: [
      {
        type: AuthProviderType.LOCAL
      },
      {
        type: AuthProviderType.LDAP,
        identifier: 'test-ldap',
        providerName: 'Test LDAP'
      },
      {
        type: AuthProviderType.DROPBOX
      },
      {
        type: AuthProviderType.FACEBOOK
      },
      {
        type: AuthProviderType.GITHUB
      },
      {
        type: AuthProviderType.GITLAB,
        identifier: 'test-gitlab',
        providerName: 'Test GitLab'
      },
      {
        type: AuthProviderType.GOOGLE
      },
      {
        type: AuthProviderType.OAUTH2,
        identifier: 'test-oauth2',
        providerName: 'Test OAuth2'
      },
      {
        type: AuthProviderType.SAML,
        identifier: 'test-saml',
        providerName: 'Test SAML'
      },
      {
        type: AuthProviderType.TWITTER
      }
    ],
    branding: {
      name: 'DEMO Corp',
      logo: '/mock-public/img/demo.png'
    },
    useImageProxy: false,
    specialUrls: {
      privacy: 'https://example.com/privacy',
      termsOfUse: 'https://example.com/termsOfUse',
      imprint: 'https://example.com/imprint'
    },
    version: {
      major: 2,
      minor: 0,
      patch: 0,
      commit: 'mock'
    },
    plantumlServer: 'https://www.plantuml.com/plantuml',
    maxDocumentLength: 1000000,
    iframeCommunication: {
      editorOrigin: process.env.NEXT_PUBLIC_EDITOR_ORIGIN ?? 'http://localhost:3001/',
      rendererOrigin: process.env.NEXT_PUBLIC_RENDERER_ORIGIN ?? 'http://127.0.0.1:3001/'
    }
  }) || respondMethodNotAllowed(res)
}

export default handler
